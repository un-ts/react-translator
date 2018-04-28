import React from 'react'
import { create } from 'react-test-renderer'

import { TranslatorContext, createTranslator, withTranslator } from '../lib'

describe('provider', () => {
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
      <TranslatorContext.Provider
        value={{
          translator,
          locale: translator.locale,
        }}
      >
        <App />
      </TranslatorContext.Provider>,
    )
    expect(app.toJSON).toMatchSnapshot()
  })
})
