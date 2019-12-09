const path = require('path');
const autoprefixer = require('autoprefixer');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const clear = require('rollup-plugin-clear');
const typescript = require('rollup-plugin-typescript2');
const nodeGlobals = require('rollup-plugin-node-globals');
const progress = require('rollup-plugin-progress');
const img = require('@rollup/plugin-image');
const react = require('react');
const reactDom = require('react-dom');

const resolve = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = [{
  input: resolve('src/index.tsx'),
  output: {
    file: resolve('dist/index.js'),
    format: 'cjs'
  },
  // external: ['react', 'react-dom'],
  plugins: [
    nodeResolve({ extensions: ['.js', 'jsx', '.ts', '.tsx'] }),
    commonjs({
      namedExports: {
        'react': Object.keys(react),
        'react-dom': Object.keys(reactDom)
      }
    }),
    nodeGlobals(),
    clear({
      targets: ['dist'],
    }),
    img(),
    postcss({
      extract: false, // 可配置生成绝对路径
      minimize: isProductionEnv,
      extensions: ['css', 'less'],
      plugins: [autoprefixer]
    }),
    typescript({
      useTsconfigDeclarationDir: true
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    // Progress while building
    progress({ clearLine: false }),
  ],
}]