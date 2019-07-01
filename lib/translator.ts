export interface Translation<T extends number | string = string> {
  [key: string]: T | Translation<T>
}

export type TranslateInput =
  | Translation<number | string>
  | (number | string | Translation<number | string>)[]

export interface Translator<Locale = string> {
  (key: string, params?: TranslateInput, ignoreNonExist?: boolean): string
  defaultLocale?: Locale
  locale?: Locale
}

export interface Translations {
  [locale: string]: Translation
}

export const LOCALE = 'locale'
export const DEFAULT_LOCALE = 'defaultLocale'

const getValue = (input: TranslateInput, key: string): string => {
  key = key.replace(/\[(\d+)\]/g, '.$1')
  let value: string | TranslateInput = input

  key.split('.').some(k => {
    if (!value || typeof value !== 'object') {
      return true
    }

    value = (value as Translation)[k]
  })

  if (typeof value === 'object') {
    // istanbul ignore else
    if (process.env.NODE_ENV === 'development' && value !== null) {
      console.warn('you are trying to get non-literal value')
    }
    return value.toString()
  }

  return value
}

export type Merge = (prev: Translations, next: Translations) => Translations

export interface TranslatorOptions {
  locale: string
  translations?: Translations
  defaultLocale?: string
  merge?: Merge
}

let translations: Translations
let merge: Merge

export const mergeTranslations = (t: Translations) => {
  if (!merge) {
    // istanbul ignore else
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'ReactTranslator will not help you to merge translations, please pass your own merge strategy, `lodash.merge` for example',
      )
    }
    return
  }

  merge(translations, t)
}

export const createTranslator = (
  translatorOptions: string | TranslatorOptions,
): Translator => {
  if (typeof translatorOptions === 'string') {
    translatorOptions = { locale: translatorOptions }
  }

  const {
    locale: instanceLocale,
    translations: instanceTranslations,
    defaultLocale: instanceDefaultLocale,
    merge: instanceMerge,
  } = translatorOptions

  if (instanceTranslations) {
    if (!translations) {
      translations = instanceTranslations
    } // istanbul ignore next
    else if (
      process.env.NODE_ENV === 'development' &&
      translations !== instanceTranslations
    ) {
      console.warn('translations should only be injected once!')
    }
  } // istanbul ignore next
  else if (!translations) {
    translations = {}
  }

  if (instanceMerge) {
    if (!merge) {
      merge = instanceMerge
    } // istanbul ignore next
    else if (
      process.env.NODE_ENV === 'development' &&
      merge !== instanceMerge
    ) {
      console.warn('merge should only be injected once!')
    }
  }

  const instance: Translator = (
    key: string,
    params?: TranslateInput,
    ignoreNonExist?: boolean,
  ) => {
    const { locale } = instance
    const translation = translations[locale]

    let value = getValue(translation, key)

    if (value === undefined) {
      const { defaultLocale } = instance

      if (defaultLocale && defaultLocale !== locale) {
        const defaultTranslation = translations[defaultLocale]
        value = getValue(defaultTranslation, key)
      }

      if (
        process.env.NODE_ENV === 'development' &&
        value === undefined &&
        !ignoreNonExist
      ) {
        console.warn(
          `your are trying to get nonexistent key \`${key}\` without default locale fallback`,
        )
      }
    }

    value =
      value &&
      value.replace(/{([^{}]+)}/g, (_matched, $0) =>
        getValue(params, $0.trim()),
      )

    return value == null ? key : value
  }

  instance.locale = instanceLocale
  instance.defaultLocale = instanceDefaultLocale

  return instance
}
