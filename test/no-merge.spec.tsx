import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

const mockFn = (console.warn = jest.fn())

import { createTranslator, withTranslator } from '../lib'

configure({ adapter: new Adapter() })

const translator = createTranslator('en')

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
