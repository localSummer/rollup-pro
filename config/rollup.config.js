const path = require('path');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const clear = require('rollup-plugin-clear');
const typescript = require('rollup-plugin-typescript2');
const nodeGlobals = require('rollup-plugin-node-globals');

const resolve = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = [{
  input: resolve('src/index.ts'),
  output: {
    file: resolve('dist/index.js'),
    format: 'cjs'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    nodeGlobals(),
    clear({
      targets: ['dist'],
    }),
    postcss({
      extract: true, // 可配置生成绝对路径
      minimize: isProductionEnv,
      extensions: ['css', 'less'],
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: [/\/node_modules\//]
    })
  ],
}]