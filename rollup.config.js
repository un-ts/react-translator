import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const pkg = require('./package.json')

const NODE_ENV = process.env.NODE_ENV || 'development'
const format = process.env.FORMAT || 'umd'

const isProd = NODE_ENV === 'production'

const plugins = [buble()]

if (format === 'umd') {
  plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.REACT_ENV': JSON.stringify('client'),
    }),
  )
}

if (isProd) {
  plugins.push(
    uglify({
      output: {
        comments: /^!/,
      },
    }),
  )
}

export default {
  external: ['react', 'react-dom', 'prop-types'],
  input: 'dist/es/index.js',
  output: {
    amd: {
      id: 'react-translator',
    },
    banner: `/*!
* ${pkg.name} ${pkg.description}
* Version ${pkg.version}
* Copyright (C) 2018 JounQin <admin@1stg.me>
* Released under the MIT license
*
* Github: https://github.com/JounQin/react-translator
*/`,
    exports: 'named',
    file: `dist/${format}/react-translator${isProd ? '.min' : ''}.js`,
    format,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
    },
    name: 'ReactTranslator',
  },
  plugins,
}
