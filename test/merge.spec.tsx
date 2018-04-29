import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { merge } from 'lodash'
import React from 'react'

import { TranslatorContext, createTranslator, withTranslator } from '../lib'

configure({ adapter: new Adapter() })

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

  const wrapper = shallow(
    <TranslatorContext.Provider value={{ translator }}>
      <App />
    </TranslatorContext.Provider>,
  )

  it('should render msg correctly', () => {
    expect(wrapper.dive().text()).toBe('Message')
    expect(wrapper.state('locale')).toBe('en')
  })
})
