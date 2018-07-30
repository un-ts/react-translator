import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { merge } from 'lodash'
import React from 'react'

import { Translator, withTranslator } from '../lib'

// tslint:disable-next-line:no-console
const mockFn = (console.warn = jest.fn())

configure({ adapter: new Adapter() })

Translator.merge = merge

const translator = new Translator({
  defaultLocale: 'en',
  locale: 'en',
})

const options = {
  context: {
    translator,
  },
}

describe('withTranslator', () => {
  const App = withTranslator({
    en: {
      msg: 'Message',
      fallback: 'Fallback',
    },
    zh: {
      msg: '信息',
      fallback2: '回退',
    },
  })(({ t }) => <div>{t('msg') + t('fallback') + t('fallback2')}</div>)

  const wrapper = shallow(<App />, options)

  it('should render msg correctly', () => {
    expect(wrapper.dive().text()).toBe('MessageFallbackfallback2')
    expect(mockFn).toBeCalled()
    expect(wrapper.state('defaultLocale')).toBe('en')
    expect(wrapper.state('locale')).toBe('en')
  })

  it('should be reactive on locale changing', () => {
    translator.set({
      locale: 'zh',
    })
    expect(wrapper.state('locale')).toBe('zh')
    expect(wrapper.dive().text()).toBe('信息Fallback回退')
  })

  it('should watch defaultLocale', () => {
    translator.set({
      locale: 'en',
      defaultLocale: 'zh',
    })
    expect(wrapper.dive().text()).toBe('MessageFallback回退')
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
