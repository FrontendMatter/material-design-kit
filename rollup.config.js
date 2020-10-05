import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const path = require('path')

const plugins = [
  peerDepsExternal(),
  alias({
    entries: [
      {
        find: '~',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }),
  scss({
    output: 'dist/material-design-kit.css',
    processor: css => require('postcss')([
      require('postcss-rtl'),
      require('autoprefixer'),
    ])
  }),
  resolve(),
  commonjs()
]

const baseConfig = {
  input: 'src/index.js'
}

export default [
  // EMS Module
  {
    ...baseConfig,
    output: [{
      format: 'es',
      file: 'dist/material-design-kit.esm.js'
    }],
    plugins,
    external: [
      'dom-factory'
    ]
  }, 

  // SSR build.
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'dist/material-design-kit.common.js'
    },
    plugins,
    external: [
      'dom-factory'
    ]
  },

  // UMD Browser
  {
    ...baseConfig,
    output: {
      format: 'umd',
      name: 'MDK',
      file: 'dist/material-design-kit.js'
    },
    plugins: [
      ...plugins,
      babel({
        babelHelpers: 'bundled',
        skipPreflightCheck: true,
        exclude: 'node_modules/**'
      }),
      terser()
    ],
    external: [
      'dom-factory'
    ]
  }
]