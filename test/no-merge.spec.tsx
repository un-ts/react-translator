import { render } from '@testing-library/react'
import React from 'react'

const mockFn = (console.warn = jest.fn())

import { TranslatorContext, createTranslator, withTranslator } from '../lib'

const translator = createTranslator('en')

describe('merge', () => {
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
