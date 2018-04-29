import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

const mockFn = (console.warn = jest.fn())

import { TranslatorContext, createTranslator, withTranslator } from '../lib'

configure({ adapter: new Adapter() })

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

  shallow(
    <TranslatorContext.Provider value={{ translator }}>
      <App />
    </TranslatorContext.Provider>,
  )

  it('should warn on no merge', () => {
    expect(mockFn).toBeCalled()
  })
})
