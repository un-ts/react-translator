import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

const mockFn = (console.warn = jest.fn())

import { createTranslator, withTranslator } from '../lib'

configure({ adapter: new Adapter() })

const translator = createTranslator({
  defaultLocale: 'en',
  locale: 'en',
  translations: {
    en: {
      msg: 'Message',
      fallback: 'Fallback',
    },
    zh: {
      msg: '信息',
      fallback2: '回退',
    },
  },
})

const options = {
  context: {
    translator,
  },
}

describe('withTranslator', () => {
  const App = withTranslator()(({ t }) => (
    <div>{t('msg') + t('fallback') + t('fallback2')}</div>
  ))
  const wrapper = shallow(<App />, options)

  it('should render msg correctly', () => {
    expect(wrapper.dive().text()).toBe('MessageFallbackfallback2')
    expect(mockFn).toBeCalled()
    expect(wrapper.state('locale')).toBe('en')
  })

  it('should be reactive on locale changing', () => {
    translator.locale = 'zh'
    expect(wrapper.state('locale')).toBe('zh')
    expect(wrapper.dive().text()).toBe('信息Fallback回退')
  })

  it('should wacth defaultLocale', () => {
    translator.defaultLocale = 'zh'
    translator.locale = 'en'
    expect(wrapper.dive().text()).toBe('MessageFallback回退')
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
