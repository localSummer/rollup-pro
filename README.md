> 分支 [`koa-tools`](https://github.com/localSummer/rollup-pro/tree/koa-tools) 为 koa2 + typescript 的开发环境，最初预想使用 `rollup` 进行打包，无奈报错太多，转而使用 `tsc` 进行 ts 源代码的编译工作。
```javascript
"scripts": {
  "compile": "npx tsc --project tsconfig.json -w",
  "dev": "npx nodemon bin/www",
  "build": "npx tsc --project tsconfig.json",
  "prd": "npx pm2 start bin/www",
  "eslint": "npx eslint src --ext .ts"
},
```

#### app.ts

```javascript
import Koa from 'koa';
import onerror from 'koa-onerror';
import cors from 'koa2-cors';
import bodyparser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import koaStatic from 'koa-static';
import path from 'path';

import index from './routes';

const app = new Koa();

// 错误处理
onerror(app);

// 中间件
app.use(cors());
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
app.use(koaStatic(path.resolve(__dirname, '../public')));

// logger
app.use(async (ctx: Koa.Context, next: Koa.Next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 路由
app.use(index.routes());
app.use(index.allowedMethods());

// error-handling
app.on('error', (err: Error, ctx: Koa.Context) => {
  console.error('server error', err, ctx);
});

export default app;

```