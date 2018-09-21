import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import minify from 'rollup-plugin-babel-minify'
export default {
  input: 'src/index.js',
  output: [{
    file: 'lib/index.min.js',
    name: 'element2canvas',
    format: 'iife'
  }, {
    file: 'lib/index.js',
    format: 'esm'
  }, {
    file: 'lib/index.amd.js',
    format: 'amd'
  }, {
    file: 'lib/index.cjs.js',
    format: 'cjs'
  }],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    minify()
  ]
}
