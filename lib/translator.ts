export interface Translations {
  [locale: string]: any
}

export interface TranslatorOptions {
  locale: string
  defaultLocale?: string
}

export class Translator {
  static merge(_prev: Translations, _next: Translations): Translations {
    // istanbul ignore next
    if (process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line no-console
      console.warn(
        'ReactTranslator will not help you to merge translations, please manually set your own merge strategy with `Translator.merge = merge`, `lodash.merge` for example',
      )
    }
    return null
  }

  static addTranslations(translations: Translations) {
    Translator.merge(Translator.translations, translations)
  }

  private static translations: Translations = {}

  private _locale: string
  private _defaultLocale: string

  get locale() {
    return this._locale
  }

  get defaultLocale() {
    return this._defaultLocale
  }

  constructor(options: string | TranslatorOptions) {
    if (typeof options === 'string') {
      options = { locale: options }
    }

    const { locale, defaultLocale } = options

    this._locale = locale
    this._defaultLocale = defaultLocale
  }

  getValue(input: any, key: string): string {
    key = key.replace(/\[(\d+)\]/g, '.$1')
    let value = input

    key.split('.').some(k => {
      if (!value || typeof value !== 'object') {
        return true
      }

      value = value[k]
    })

    if (typeof value === 'object') {
      // istanbul ignore next
      if (process.env.NODE_ENV === 'development' && value !== null) {
        // tslint:disable-next-line no-console
        console.warn('you are trying to get non-literal value')
      }
      return value && value.toString()
    }

    return value
  }

  // we need to confirm `this` inside will not be overridden
  get = (key: string, params?: any, ignoreNonExist?: boolean): string => {
    const translation = Translator.translations[this.locale]

    let value = this.getValue(translation, key)

    if (value === undefined) {
      if (this.defaultLocale && this.defaultLocale !== this.locale) {
        const defaultTranslation = Translator.translations[this.defaultLocale]
        value = this.getValue(defaultTranslation, key)
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
      value.replace(/{([^{}]+)}/g, (_matched, $0) =>
        this.getValue(params, $0.trim()),
      )

    return value == null ? key : value
  }

  setLocale(locale: string) {
    this._locale = locale
  }

  setDefaultLocale(defaultLocale: string) {
    this._defaultLocale = defaultLocale
  }
}
