# react-translator2

[![Greenkeeper badge](https://badges.greenkeeper.io/JounQin/react-translator.svg)](https://greenkeeper.io/)
[![Codecov](https://img.shields.io/codecov/c/github/JounQin/react-translator.svg)](https://codecov.io/gh/JounQin/react-translator)
[![Travis](https://img.shields.io/travis/JounQin/react-translator.svg)](https://travis-ci.org/JounQin/react-translator)
[![npm](https://img.shields.io/npm/dt/react-translator2.svg)](https://www.npmjs.com/package/react-translator2)
[![David](https://img.shields.io/david/JounQin/react-translator.svg)](https://david-dm.org/JounQin/react-translator)
[![David Dev](https://img.shields.io/david/dev/JounQin/react-translator.svg)](https://david-dm.org/JounQin/react-translator?type=dev)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A deadly simple i18n translate plugin for React, ready for Server Side Rendering.

## Demo

https://JounQin.github.io/react-translator

## Related

[VueTranslator](https://github.com/JounQin/vue-translator)

### Usage

```bash
yarn add react-translator2
```

```ts
import { Translator, TranslatorProvider, withTranslator } from 'react-translator2'

const translator = new Translator({
  locale?: string, // set it on initialize or before first rendering
  defaultLocale?: string, // when no value can be found in current locale, try to fallback to defaultLocale
})

// `lodash.merge` for example, you must pass it
Translator.merge = merge

// If you want to define translations in component only, no need to set it on initialize
Translator.addTranslations(translations: {
  [locale: string]: {
    [key:string]: string | array | object
  }
})

const App = withTranslator(translations?)(({ t, translator, locale, defaultLocale }) => <div>{t('msg')}</div>)

const app = (
  <TranslatorProvider translator={translator}>
    <App />
  </TranslatorProvider>
)
```

`translations` is often generated via `require.context` provided by `webpack` from `*.{locale}.i18n.json`:

```ts
const context = require.context('.', true, /([\w-]*[\w]+)\.i18n\.json$/)

const LOCALE_KEYS: { [key: string]: string[] } = {}

const translations: {
  [locale: string]: {
    [key: string]: string
  }
} = context.keys().reduce((modules: any, key: string) => {
  const module = context(key)
  const lang = key.match(/([\w-]*[\w]+)\.i18n\.json$/)[1]
  const matched = modules[lang] || (modules[lang] = {})

  if (process.env.NODE_ENV === 'development') {
    const keys = LOCALE_KEYS[lang] || (LOCALE_KEYS[lang] || [])
    const moduleKeys = Object.keys(module)

    const duplicates = _.intersection(keys, moduleKeys)

    if (duplicates.length) {
      console.warn('detect duplicate keys:', duplicates)
    }

    keys.push(...moduleKeys)
  }

  Object.assign(matched, module)
  return modules
}, {})
```

Then you need to use `withTranslator` to wrap your component to enable translator prop `t` and prop `locale` + `defaultLocale`, the reference value of `t` will never change what means there will be only one translator instance. And prop `locale` is string will be changed when you set value of `t.locale`.

```ts
import { withTranslator } from 'react-translator2'

export default withTranslator({
  zh: {
    message: '我的信息',
  },
  en: {
    message: 'My Message',
  },
})(({ t }) => (
  <div>
    {t('message', obj_params?)}
    {t('nested.message', arr_params?)}
  </div>
))
```

If you are trying to get a non-exist key or value is undefined, you will get a warning in console on development. And if you want to ignore it, pass a third parameter `ignoreNonExist: boolean`: `$t('non-exist-key', null, true)`.

If you want to watch locale change in any component(`withTranslator` is watching inside with enables rendering on `locale` and `defaultLocale` change), you can use `translator.watch` API like following:

```js
const unwatch = this.props.translator.watch(({ locale, defaultLocale }) => {})

// if you want to unwatch changes, maybe in `componentWillUnmount` lifecycle
unwatch()
```

Or you can also listen `componentDidUpdate` lifecycle:

```js
componentDidUpdate(prevProps: TranslatorProps) {
  if(prevProps.locale !== this.props.locale) {
    // locale changed
  }
}
```

If you want to change locale on client:

```js
{
  changeLocale() {
    this.props.translator.set({
      defaultLocale?,
      locale?,
    })
  }
}
```

### SSR related

You'd better to detect user custom locale via cookie and fallback to [accept-language](https://github.com/tinganho/node-accept-language) on first request.

And you need to generate a single translator instance for every user request (cache by locale would be better), `koa` for example:

```ts
import { Translator, TranslatorProvider } from 'react-translator2'

app.use(async (ctx, next) => {
  const translator = new Translator({
    locale: string, // ctx.cookies.get('locale_cookie')
    defaultLocale: string,
  })

  const app = (
    <TranslatorProvider translator={translator}>
      <App />
    </TranslatorProvider>
  )
})
```

## template syntax

Translation key should be string, but `.`(dot) will be parsed as nested key, it will also work in template!

```js
t('a.b.c') // will try to find `a.b.c` on your custom transition, if a is falsy, will render undefined and try default locale

// render `nested value`
withTranslator({
  en: {
    a: {
      b: {
        c: 'nested value',
      },
    },
  },
})

// render `nested template`
t('a.b', {c: d: 'nested template'})

withTranslator({
  en: {
    a: {
      b: '{ c.d }'
    },
  },
})
```

Array is also supported, `.index`(dot) or `[index]` can both be used!

```js
// nested with array key and template
// render `1`
t('a.b[0]', [{ a: 1 }])

withTranslator({
  en: {
    a: {
      b: ['{ 0.a }'], // do not use `[0].a` here, `0[a]` is also OK
    },
  },
})
```

## Feature Request or Troubleshooting

Feel free to [create an issue](https://github.com/JounQin/react-translator/issues/new).
