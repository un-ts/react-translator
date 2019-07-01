import { render } from '@testing-library/react'

import {
  TranslatorContext,
  createTranslator,
  withTranslator,
} from 'react-translator'
import { merge } from 'lodash'
import React from 'react'

const translator = createTranslator({
  locale: 'en',
  merge,
})

describe('merge', () => {
  const App = withTranslator({
    en: {
      msg: 'Message',
    },
    zh: {
      msg: '信息',
    },
  })(({ t }) => <div>{t('msg')}</div>)

  const { container } = render(
    <TranslatorContext.Provider value={{ translator }}>
      <App />
    </TranslatorContext.Provider>,
  )

  it('should render msg correctly', () => {
    expect(container.firstChild.textContent).toBe('Message')
  })
})
