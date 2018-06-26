import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { merge } from 'lodash'
import React from 'react'

import { Toggle, Translator, withTranslator } from '../lib'

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
  let toggleLocale: Toggle
  let toggleDefaulLocale: Toggle

  const App = withTranslator({
    en: {
      msg: 'Message',
      fallback: 'Fallback',
    },
    zh: {
      msg: '信息',
      fallback2: '回退',
    },
  })(({ t, toggleLocale: tl, toggleDefaulLocale: tdl }) => {
    toggleLocale = tl
    toggleDefaulLocale = tdl
    return <div>{t('msg') + t('fallback') + t('fallback2')}</div>
  })
  const wrapper = shallow(<App />, options)

  it('should render msg correctly', () => {
    expect(wrapper.dive().text()).toBe('MessageFallbackfallback2')
    expect(mockFn).toBeCalled()
    expect(wrapper.state('locale')).toBe('en')
  })

  it('should be reactive on locale changing', () => {
    toggleLocale('zh')
    expect(wrapper.state('locale')).toBe('zh')
    expect(wrapper.dive().text()).toBe('信息Fallback回退')
  })

  it('should wacth defaultLocale', () => {
    toggleDefaulLocale('zh')
    toggleLocale('en')
    expect(wrapper.dive().text()).toBe('MessageFallback回退')
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
