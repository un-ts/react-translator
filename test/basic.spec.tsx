import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

const mockFn = (console.warn = jest.fn())

import { Toggle, createTranslator, withTranslator } from '../lib'

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
  let toggleLocale: Toggle
  let toggleDefaulLocale: Toggle

  const App = withTranslator()(
    ({ t, toggleLocale: tl, toggleDefaulLocale: tdl }) => {
      toggleLocale = tl
      toggleDefaulLocale = tdl
      return <div>{t('msg') + t('fallback') + t('fallback2')}</div>
    },
  )
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
