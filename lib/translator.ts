export interface Translator<Locale = string> {
  (key: string, params?: any, ignoreNonExist?: boolean): string
  defaultLocale?: Locale
  locale?: Locale
}

export interface Translations {
  [locale: string]: any
}

export const LOCALE = 'locale'
export const DEFAULT_LOCALE = 'defaultLocale'

const getValue = (input: any, key: string): string => {
  key = key.replace(/\[(\d+)\]/g, '.$1')
  let value = input

  key.split('.').some(k => {
    if (!value || typeof value !== 'object') {
      return true
    }

    value = value[k]
  })

  if (typeof value === 'object') {
    if (process.env.NODE_ENV === 'development' && value !== null) {
      // tslint:disable-next-line no-console
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
    if (process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line no-console
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
    } else if (
      process.env.NODE_ENV === 'development' &&
      translations !== instanceTranslations
    ) {
      // tslint:disable-next-line no-console
      console.warn('translations should only be injected once!')
    }
  } else if (!translations) {
    translations = {}
  }

  if (instanceMerge) {
    if (!merge) {
      merge = instanceMerge
    } else if (
      process.env.NODE_ENV === 'development' &&
      merge !== instanceMerge
    ) {
      // tslint:disable-next-line no-console
      console.warn('merge should only be injected once!')
    }
  }

  const instance: Translator = (
    key: string,
    params?: any,
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
        // tslint:disable-next-line no-console
        console.warn(
          `your are trying to get nonexistent key \`${key}\` without default locale fallback`,
        )
      }
    }

    value =
      value &&
      value.replace(/{([^{}]+)}/g, (matched, $0) => getValue(params, $0.trim()))

    return value == null ? key : value
  }

  instance.locale = instanceLocale
  instance.defaultLocale = instanceDefaultLocale

  return instance
}
