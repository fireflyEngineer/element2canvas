import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
export default {
  input: 'src/index.js',
  output: [{
    file: 'lib/index.js',
    name: 'element2canvas',
    format: 'umd'
  }, {
    file: 'lib/index.esm.js',
    format: 'esm'
  }, {
    file: 'lib/index.amd.js',
    format: 'amd'
  }, {
    file: 'lib/index.cjs.js',
    format: 'cjs'
  }],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    commonjs()
  ]
}
