import { render } from '@testing-library/react'

import {
  TranslatorContext,
  createTranslator,
  withTranslator,
} from 'react-translator'
import React from 'react'

const mockFn = (console.warn = jest.fn())

const translator = createTranslator('en')

describe('no-merge', () => {
  const App = withTranslator({
    en: {
      msg: 'Message',
    },
    zh: {
      msg: '信息',
    },
  })(({ t }) => <div>{t('msg')}</div>)

  render(
    <TranslatorContext.Provider value={{ translator }}>
      <App />
    </TranslatorContext.Provider>,
  )

  it('should warn on no merge', () => {
    expect(mockFn).toBeCalled()
  })
})
