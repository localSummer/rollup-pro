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
const externalGlobals = require('rollup-plugin-external-globals');
const url = require('@rollup/plugin-url');
const react = require('react');
const reactDom = require('react-dom');

const resolve = function (filePath) {
  return path.join(__dirname, '..', filePath)
}

const isProductionEnv = process.env.NODE_ENV === 'production';

module.exports = [{
  input: resolve('src/index.tsx'),
  output: {
    dir: 'dist',
    entryFileNames: '[name].js',
    format: 'cjs',
    name: 'rollup-pro'
  },
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve({ extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'] }),
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
    url({
      include: ['src/**/*.svg', 'src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif'],
      destDir: 'dist/images',
      publicPath: '/dist/images/', // 公共路径
      fileName: '[name][extname]',
      limit: 0
    }),
    postcss({
      extract: false, // 可配置生成绝对路径
      minimize: isProductionEnv,
      extensions: ['css', 'less'],
      plugins: [autoprefixer]
    }),
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
    }),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
    }),
    // 使用CDN react 加载则需要如下配置，如果是使用dll打包后的 react 则不用添加 externalGlobals
    // externalGlobals({
    //   'react': "React",
    //   "react-dom": 'ReactDOM'
    // }),
    // Progress while building
    progress({ clearLine: false }),
  ],
}]