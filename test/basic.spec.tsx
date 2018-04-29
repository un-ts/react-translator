import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

const mockFn = (console.warn = jest.fn())

import {
  Toggle,
  TranslatorContext,
  createTranslator,
  withTranslator,
} from '../lib'

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

describe('withTranslator', () => {
  let toggleLocale: Toggle
  let toggleDefaultLocale: Toggle

  const App = withTranslator()(
    ({ t, toggleLocale: tl, toggleDefaultLocale: td }) => {
      toggleLocale = tl
      toggleDefaultLocale = td
      return <div>{t('msg') + t('fallback') + t('fallback2')}</div>
    },
  )

  const wrapper = shallow(
    <TranslatorContext.Provider value={{ translator }}>
      <App />
    </TranslatorContext.Provider>,
  )

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
    toggleDefaultLocale('zh')
    toggleLocale('en')
    expect(wrapper.dive().text()).toBe('MessageFallback回退')
  })

  afterAll(() => {
    wrapper.unmount()
  })
})
