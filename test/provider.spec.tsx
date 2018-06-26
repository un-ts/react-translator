import { merge } from 'lodash'
import React from 'react'
import { create } from 'react-test-renderer'

import { Translator, TranslatorProvider, withTranslator } from '../lib'

Translator.merge = merge
Translator.addTranslations({
  en: {
    msg: 'Message',
  },
})

describe('provider', () => {
  const translator = new Translator({
    locale: 'en',
  })

  const App = withTranslator()(({ t }) => <div>{t('msg')}</div>)

  it('should render correctly', () => {
    const app = create(
      <TranslatorProvider translator={translator}>
        <App />
      </TranslatorProvider>,
    )
    expect(app.toJSON).toMatchSnapshot()
  })
})
