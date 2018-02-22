export interface Translator<Locale = string> {
  (key: string, params?: any, ignoreNonExist?: boolean): string
  defaultLocale?: Locale
  locale?: Locale
  $watch?: Watch<Locale>
}

export interface Translations {
  [locale: string]: any
}

export const LOCALE = 'locale'
export const DEFAULT_LOCALE = 'defaultLocale'

export type Watcher<T> = (newVal: T, val: T) => void
export type Watch<T> = (key: string, watcher: Watcher<T>) => UnWatch
export type UnWatch = () => void

export function defineReactive<V, T extends { $watch?: Watch<V> }>(
  obj: T,
  key: string,
  val?: any,
) {
  const property = Object.getOwnPropertyDescriptor(obj, key)

  if (property && property.configurable === false) {
    return
  }

  const watchers: {
    [key: string]: Array<Watcher<V>>
  } = (ws => {
    if (ws) {
      return ws
    }

    ws = {}

    Object.defineProperty(obj, '_watchers', {
      value: ws,
    })

    return ws
  })((obj as any)._watchers)

  if (!watchers[key]) {
    watchers[key] = []
  }

  if (!obj.$watch) {
    Object.defineProperty(obj, '$watch', {
      value(k: string, watcher: Watcher<V>) {
        const ws = watchers[k]
        if (!ws) {
          return
        }
        ws.push(watcher)
        return () => {
          const index = ws.indexOf(watcher)
          if (index < 0) {
            if (process.env.NODE_ENV === 'development') {
              // tslint:disable-next-line no-console
              console.warn('the watcher has been removed before')
            }
            return
          }
          ws.splice(index, 1)
        }
      },
    })
  }

  const getter = property && property.get
  const setter = property && property.set

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      const value = getter ? getter.call(obj) : val
      return value
    },
    set(newVal) {
      const value = getter ? getter.call(obj) : val

      /* istanbul ignore next */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }

      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }

      watchers[key].forEach(watcher => {
        watcher(newVal, value)
      })
    },
  })
}

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
    return value && value.toString()
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

export let merge: Merge

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

  defineReactive(instance, LOCALE, instanceLocale)
  defineReactive(instance, DEFAULT_LOCALE, instanceDefaultLocale)

  return instance
}
