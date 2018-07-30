import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

// tslint:disable-next-line:no-console
const mockFn = (console.warn = jest.fn())

import { Translator, withTranslator } from '../lib'

configure({ adapter: new Adapter() })

const translator = new Translator('en')

const options = {
  context: {
    translator,
  },
}

describe('merge', () => {
  const App = withTranslator({
    en: {
      msg: 'Message',
    },
    zh: {
      msg: '信息',
    },
  })(({ t }) => <div>{t('msg')}</div>)

  shallow(<App />, options)

  it('should warn on no merge', () => {
    expect(mockFn).toBeCalled()
  })
})
