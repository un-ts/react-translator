import { merge } from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import { LOCALE, Toggle, TranslatorContext, createTranslator } from '../lib'

import { getItem, setItem } from 'utils'

import App from './App'

import { translations } from './translator'

const AppContainer =
  process.env.NODE_ENV === 'development'
    ? // tslint:disable-next-line:no-var-requires
      require('react-hot-loader').AppContainer
    : React.Fragment

const translator = createTranslator({
  defaultLocale: 'en',
  locale: getItem(LOCALE) || 'zh',
  translations,
  merge,
})

const toggleLocale: Toggle = locale => {
  setItem(LOCALE, locale)
}

const renderApp = () =>
  render(
    <AppContainer>
      <TranslatorContext.Provider value={{ translator, toggleLocale }}>
        <App />
      </TranslatorContext.Provider>
    </AppContainer>,
    document.getElementById('app'),
  )

renderApp()

if (module.hot) {
  module.hot.accept('App', renderApp)
}
