import { merge } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

import { LOCALE, Toggle, TranslatorContext, createTranslator } from '../lib'

import { getItem, setItem } from 'utils'

import App from './App'

import { translations } from './translator'

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
