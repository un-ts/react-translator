import { merge } from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { getItem } from 'utils'

import { Translator, TranslatorProvider } from '../lib'

import { translations } from './translator'
import App from './App'

const AppContainer =
  process.env.NODE_ENV === 'development'
    ? // tslint:disable-next-line:no-var-requires
      require('react-hot-loader').AppContainer
    : React.Fragment

Translator.addTranslations(translations)
Translator.merge = merge

const translator = new Translator({
  defaultLocale: 'en',
  locale: getItem('locale') || 'zh',
})

const renderApp = () =>
  render(
    <AppContainer>
      <TranslatorProvider translator={translator}>
        <App />
      </TranslatorProvider>
    </AppContainer>,
    document.getElementById('app'),
  )

renderApp()

if (module.hot) {
  module.hot.accept('App', renderApp)
}
