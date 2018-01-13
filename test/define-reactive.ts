import { defineReactive } from '../lib'

describe('defineReactive', () => {
  it('should add $watch on target', () => {
    const target: any = {}
    defineReactive(target, 'key')
    expect(target).toHaveProperty('_watchers')
    expect(target).toHaveProperty('$watch')
  })

  it('should not watch non exsit key', () => {
    const target: any = {}
    defineReactive(target, 'key')
    expect(target.$watch('non-exsit', () => {})).toBe(undefined)
  })

  it('should watch key changes correctly', () => {
    const target: any = {}
    defineReactive(target, 'key')
    const mockFn1 = jest.fn()
    expect(target.$watch('key', mockFn1)).not.toBe(undefined)
    target.key = null
    expect(mockFn1).toBeCalled()
    const mockFn2 = jest.fn()
    const unwatch = target.$watch('key', mockFn2)
    unwatch()
    target.key = null
    expect(mockFn2).not.toBeCalled()
  })

  it('should not throw with configurable false', () => {
    const target = {}
    Object.defineProperty(target, 'key', {
      configurable: false,
    })
    expect(() => defineReactive(target, 'key')).not.toThrowError()
  })

  it('should work with custom getter and setter', () => {
    const target: any = {}
    let val: string
    const setter = jest.fn((newVal: string) => {
      val = newVal
    })
    Object.defineProperty(target, 'key', {
      configurable: true,
      get() {
        return val
      },
      set: setter,
    })
    defineReactive(target, 'key')
    const mockFn = jest.fn()
    target.$watch('key', mockFn)
    target.key = null
    expect(target.key).toBe(null)
    expect(setter).toBeCalledWith(null)
    expect(mockFn).toBeCalled()
  })
})
