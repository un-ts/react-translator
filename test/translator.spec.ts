import { merge } from 'lodash'

import { Translator } from '../lib'

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
  }).get

  it('should warn about non exsit key and return key', () => {
    expect(translator('non-exsit.nested')).toBe('non-exsit.nested')
    expect(mockFn).toBeCalled()
  })

  it('should work with nested param', () => {
    expect(
      translator('nested.name', {
        name: 'JounQin',
      }),
    ).toBe('My name is JounQin')
  })

  it('should warn about non-literal value', () => {
    translator('obj')
    expect(mockFn).toBeCalled()
  })
})
