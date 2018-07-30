import { merge } from 'lodash'

import { Translator } from '../lib'

// tslint:disable-next-line:no-console
const mockFn = (console.warn = jest.fn())

Translator.merge = merge
Translator.addTranslations({
  en: {
    nested: {
      name: 'My name is { name }',
    },
    obj: {},
  },
})

describe('translator', () => {
  const translator = new Translator({
    locale: 'en',
    defaultLocale: 'en',
  })

  const t = translator.get

  const watcher = jest.fn()

  afterEach(() => {
    watcher.mockReset()
  })

  it('should watch locale or defaultLocale change correctly', () => {
    const unwtach = translator.watch(watcher)
    translator.set({
      locale: 'zh',
    })
    expect(watcher).toBeCalled()
    watcher.mockReset()
    unwtach()
    expect(watcher).not.toBeCalled()
  })

  it('should watch same wather only once', () => {
    const unwtach = translator.watch(watcher)
    translator.watch(watcher)
    translator.set({
      locale: 'en',
    })
    expect(watcher).toHaveBeenCalledTimes(1)
    unwtach()
  })

  it('should not trigger watcher on same value', () => {
    const unwtach = translator.watch(watcher)
    translator.set({
      locale: 'en',
      defaultLocale: 'en',
    })
    translator.set({})
    expect(watcher).not.toBeCalled()
    unwtach()
  })

  it('should not throw error on calling unwatch twice', () => {
    const unwtach = translator.watch(watcher)
    unwtach()
    expect(() => unwtach()).not.toThrowError()
  })

  it('should warn about non exsit key and return key', () => {
    expect(t('non-exsit.nested')).toBe('non-exsit.nested')
    expect(mockFn).toBeCalled()
  })

  it('should work with nested param', () => {
    expect(
      t('nested.name', {
        name: 'JounQin',
      }),
    ).toBe('My name is JounQin')
  })

  it('should warn about non-literal value', () => {
    t('obj')
    expect(mockFn).toBeCalled()
  })
})
