rollup 主要针对 JavaScript 库进行打包，对 `css` 、`image` 等其他资源支持不够友好

#### 核心包

- `rollup-plugin-commonjs` 转化cmd模块，使用 `namedExports` 导出找不到的 API 名字
- `rollup-plugin-typescript2` typescript 编译
- `rollup-plugin-babel` ES6编译
- `@rollup/plugin-url` 图片打包，可配置打包为base64或者copy图片的临界值，可配置 publicPath 根路径
- `rollup-plugin-postcss` css打包
- `rollup-plugin-serve` 启动本地服务
- `rollup-plugin-livereload` 监听文件改变，并刷新浏览器
- `rollup-plugin-terser` 代码压缩
- `rollup-plugin-external-globals` 使用 CDN 加载 react 则需要使用该插件配置，如果是使用dll打包后的 react 则不用添加 externalGlobals 插件配置
- `rollup-plugin-clear` 清空指定目录
- `rollup-plugin-progress` 打包进度条

tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react",
    "baseUrl": ".",
    "rootDirs": ["src"],
    "moduleResolution": "node",
    "target": "es5",
    "module":"esnext",
    "lib": ["es6", "dom"],
    "strict": true,
    "sourceMap": true,
    // "allowJs": true,
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "declarationDir": "dist/types",
    "outDir": "dist"
  },
  "include": [
    "src/**/*",
    "images.d.ts"
  ],
  "exclude": ["node_modules", "dist", "config"]
}
```

babel.config.js
```javascript
module.exports = {
  presets: [[
    "@babel/preset-env",
    {
      "modules": false,
      "useBuiltIns": "usage",
      "corejs": "3.3.3",
      "targets": {
        "ie": 10
      }
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
    "@babel/plugin-transform-runtime" // 解决多个地方使用相同代码导致打包重复的问题
  ]
}
```

eslint 配置，使用 eslint cli 自动生成，添加了推荐的 `plugin:prettier/recommended` 规则
``` javascript
module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:prettier/recommended",
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {}
};
```

jest 测试框架配置
package.json 中配置（也可抽出一个单独的jest配置文件）

npm 包依赖
`jest` `jest-config` `ts-jest` `@types/jest` `jest-environment-jsdom-fourteen` `jest-watch-typeahead`
`@types/enzyme` `@types/enzyme-adapter-react-16` `enzyme` `enzyme-adapter-react-16` `enzyme-to-json` `identity-obj-proxy`
`react-app-polyfill`

``` json
"jest": {
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
  ],
  "setupFiles": [
    "react-app-polyfill/jsdom",
    "<rootDir>/setup-react-adapter.ts"
  ],
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/test/"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 90,
      "functions": 95,
      "lines": 95,
      "statements": 95
    }
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ]
  }
```

cssTransform.js
``` javascript
'use strict';

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process() {
    return 'module.exports = {};';
  },
  getCacheKey() {
    // The output is always the same.
    return 'cssTransform';
  },
};
```

fileTransform.js
``` javascript
'use strict';

const path = require('path');

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
```

setup-react-adapter.ts 测试启动执行文件，配置使用enzyme 测试 React 的环境
``` javascript
import { configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";

const Adapter = ReactSixteenAdapter as any;

configure({ adapter: new Adapter() });
```

polyfill 另一种解决方案
[https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime](https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime)

根据浏览器兼容性自动引入 polyfills
```html
<script src="https://polyfill.alicdn.com/polyfill.min.js?features=default,es2017,es6,fetch,RegeneratorRuntime"></script>
```