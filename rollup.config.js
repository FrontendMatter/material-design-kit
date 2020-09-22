import alias from 'rollup-plugin-alias'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import babel from '@rollup/plugin-babel'

const plugins = [
  peerDepsExternal(),
  alias({
    resolve: ['.js', '.vue'],
    '~': __dirname + '/src'
  }),
  babel({
    babelHelpers: 'runtime'
  }),
  commonjs(),
  scss({
    output: 'dist/material-design-kit.css',
    processor: css => require('postcss')([
      require('postcss-rtl'),
      require('autoprefixer'),
    ])
  }),
  buble({
    objectAssign: 'Object.assign'
  })
]

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      file: 'dist/material-design-kit.esm.js'
    },
    plugins,
    external: [/@babel\/runtime/]
  },
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'MDK',
      file: 'dist/material-design-kit.umd.js'
    },
    plugins: plugins
  }
]