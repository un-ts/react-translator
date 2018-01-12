import { intersection } from 'lodash'

import { Locale } from 'utils'

const context = require.context('.', true, I18N_REGEX)

const { EN, ZH } = Locale

const LOCALE_KEYS: { [key: string]: string[] } = {
  [EN]: [],
  [ZH]: [],
}

export const translations: {
  [locale: string]: {
    [key: string]: string
  }
} = context.keys().reduce((modules: any, key: string) => {
  const module = context(key)
  const lang = key.match(I18N_REGEX)[1]
  const matched = modules[lang] || (modules[lang] = {})

  if (__DEV__) {
    const keys = LOCALE_KEYS[lang]
    const moduleKeys = Object.keys(module)

    const duplicates = intersection(keys, moduleKeys)

    if (duplicates.length) {
      // tslint:disable-next-line no-console
      console.warn('detect duplicate keys:', duplicates)
    }

    keys.push(...moduleKeys)
  }

  Object.assign(matched, module)

  return modules
}, {})
