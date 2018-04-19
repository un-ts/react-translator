import React from 'react'
import { create } from 'react-test-renderer'

import { TranslatorProvider, createTranslator, withTranslator } from '../lib'

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
      <TranslatorProvider translator={translator}>
        <App />
      </TranslatorProvider>,
    )
    expect(app.toJSON).toMatchSnapshot()
  })
})
