import { merge } from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import { TranslatorProvider, createTranslator } from '../lib'

import { getItem } from 'utils'

import App from './App'

import { translations } from './translator'

const AppContainer =
  process.env.NODE_ENV === 'development'
    ? // tslint:disable-next-line:no-var-requires
      require('react-hot-loader').AppContainer
    : React.Fragment

const translator = createTranslator({
  defaultLocale: 'en',
  locale: getItem('locale') || 'zh',
  translations,
  merge,
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
