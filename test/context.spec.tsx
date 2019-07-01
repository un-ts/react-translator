import {
  TranslatorContext,
  createTranslator,
  withTranslator,
} from 'react-translator'
import React from 'react'
import { create } from 'react-test-renderer'

describe('context', () => {
  const translator = createTranslator({
    locale: 'en',
    translations: {
      en: {
        msg: 'Message',
      },
    },
  })

  const App = withTranslator()(({ t }) => <div>{t('msg')}</div>)

  it('should render correctly', () => {
    const app = create(
      <TranslatorContext.Provider value={{ translator }}>
        <App />
      </TranslatorContext.Provider>,
    )
    expect(app.toJSON()).toMatchSnapshot()
  })
})
