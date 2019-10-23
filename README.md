rollup 主要针对 JavaScript 库进行打包，对 `css` 、`image` 等其他资源支持不够友好

#### 核心包

- `rollup-plugin-typescript2` typescript 编译
- `rollup-plugin-babel` ES6编译
- `rollup-plugin-img` 图片打包
- `rollup-plugin-postcss` css打包
- `rollup-plugin-serve` 启动本地服务
- `rollup-plugin-livereload` 监听文件改变，并刷新浏览器
- `rollup-plugin-uglify` 代码压缩

tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react",
    "rootDir": "src",
    "moduleResolution": "node",
    "target": "es5",
    "module":"esnext",
    "lib": ["es6", "dom"],
    "strict": true,
    "sourceMap": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declarationDir": "dist/types",
    "outDir": "dist/lib"
  },
  "include": [
    "src" // 确保该目录包含 images.d.ts 文件，否则导入图片报错
  ]
}
```

babel.config.js
```javascript
module.exports = {
  presets: [[
    "@babel/preset-env",
    {
      useBuiltIns: "usage"
    }
  ], "@babel/preset-react"],
  plugins: [
    [
      "@babel/plugin-transform-classes",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties", 
      { "loose": true }
    ],
    [
      "@babel/plugin-proposal-object-rest-spread",
      { "useBuiltIns": true }
    ],
    "@babel/plugin-transform-react-jsx",
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": true,
        // "polyfill": false,
        "regenerator": true,
        "absoluteRuntime": "@babel/runtime"
      }
    ]
  ]
}
```

polyfill 另一中解决方案
[https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime](https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime)

根据浏览器兼容性自动引入 polyfills
```html
<script src="https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime"></script>
```