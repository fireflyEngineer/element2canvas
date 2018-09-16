import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
export default {
  input: 'src/index.js',
  output: [{
    file: 'lib/index.js',
    name: 'umdPackage',
    format: 'umd'
  }, {
    file: 'lib/index.es.js',
    format: 'es'
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
    })
  ]
}
