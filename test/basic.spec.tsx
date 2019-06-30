import { render } from '@testing-library/react'
import React from 'react'

const mockWarn = (console.warn = jest.fn())
const mockToggle = jest.fn()
const mockToggleDefault = jest.fn()

import {
  Toggle,
  TranslatorContext,
  createTranslator,
  withTranslator,
} from '../lib'

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
      Fallback2: '回退',
    },
  },
})

describe('withTranslator', () => {
  let toggleLocale: Toggle
  let toggleDefaultLocale: Toggle
  let container: HTMLElement
  let index = 0

  const App = withTranslator()(
    ({ t, toggleLocale: tl, toggleDefaultLocale: td }) => {
      toggleLocale = tl
      toggleDefaultLocale = td
      return <div>{t('msg') + t('fallback') + t('Fallback2')}</div>
    },
  )

  beforeEach(() => {
    const passProps = !!(index++ % 2)
    container = render(
      <TranslatorContext.Provider value={{ translator }}>
        <App
          toggleLocale={passProps ? mockToggle : null}
          toggleDefaultLocale={passProps ? null : mockToggleDefault}
        />
      </TranslatorContext.Provider>,
    ).container
  })

  it('should render msg correctly', () => {
    expect(container.firstChild.textContent).toBe('MessageFallbackFallback2')
    expect(mockWarn).toBeCalled()
  })

  it('should be reactive on locale changing', () => {
    toggleLocale('zh')
    expect(mockToggle).toBeCalled()
    expect(container.firstChild.textContent).toBe('信息Fallback回退')
  })

  it('should watch defaultLocale', () => {
    toggleDefaultLocale('zh')
    expect(mockToggleDefault).toBeCalled()
    toggleLocale('en')
    expect(mockToggle).toBeCalled()
    expect(container.firstChild.textContent).toBe('MessageFallback回退')
  })
})
