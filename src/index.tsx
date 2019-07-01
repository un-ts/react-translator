import { translations } from './translator'
import App from './App'

import {
  LOCALE,
  Toggle,
  TranslatorContext,
  createTranslator,
} from 'react-translator'
import { merge } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import { getItem, setItem } from 'utils'

const translator = createTranslator({
  defaultLocale: 'en',
  locale: getItem(LOCALE) || 'zh',
  translations,
  merge,
})

const toggleLocale: Toggle = locale => {
  setItem(LOCALE, locale)
}

ReactDOM.render(
  <TranslatorContext.Provider value={{ translator, toggleLocale }}>
    <App />
  </TranslatorContext.Provider>,
  document.getElementById('app'),
)
