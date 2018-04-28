import { merge } from 'lodash'
import React from 'react'
import { render } from 'react-dom'

import {
  LOCALE,
  TranslatorContext,
  TranslatorContextState,
  createTranslator,
} from '../lib'

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

class TranslatorContainer extends React.PureComponent {
  state: TranslatorContextState = {
    translator,
    toggleLocale: locale => {
      setItem(LOCALE, locale)
    },
  }

  render() {
    return (
      <TranslatorContext.Provider value={this.state}>
        <App />
      </TranslatorContext.Provider>
    )
  }
}

const renderApp = () =>
  render(
    <AppContainer>
      <TranslatorContainer />
    </AppContainer>,
    document.getElementById('app'),
  )

renderApp()

if (module.hot) {
  module.hot.accept('App', renderApp)
}
