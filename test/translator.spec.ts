import { merge, mergeWith } from 'lodash'

const mockFn = (console.warn = jest.fn())

import { createTranslator } from '../lib'

describe('translator', () => {
  const translator = createTranslator({
    locale: 'en',
    translations: {
      en: {
        nested: {
          name: 'My name is { name }',
        },
        obj: {},
      },
    },
    merge,
  })

  it('should warn about inject twice', () => {
    createTranslator({
      locale: 'en',
      translations: {},
      merge: mergeWith,
    })

    expect(mockFn).toBeCalled()
  })

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
