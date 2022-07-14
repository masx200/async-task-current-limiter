# async-task-current-limiter

# 介绍

异步任务限流器 `async-task-current-limiter`

为了解决`Error: EMFILE, too many open files`的问题而生.

有太多的文件已打开，已经不能再打开了。

当您尝试一次在系统上打开太多文件时，就会发生这种情况。

由于 `Node` 的异步特性，如果您`fs.readFile`快速连续执行很多或类似的操作，则可以轻松达到系统的 `maxfiles` 限制。

# 安装教程

```shell
yarn add https://github.com/masx200/async-task-current-limiter.git
```

# 使用说明

```js
import AsyncLimiterClass from "@masx200/async-task-current-limiter";
```

# 示例

创建一个异步限流器对象,设定最大同时执行的异步任务数 30 个

当成函数使用

```js
const asynclimiter = AsyncLimiterClass(30);
```

或者当成类使用

```js
const asynclimiter = new AsyncLimiterClass(30);
```

监听异步限流器的`free`和`full`的事件

```js
const listener = (data) => console.log(JSON.stringify(data));

asynclimiter.target.on("free", listener);

asynclimiter.target.on("full", listener);
```

用异步限流包装器,包装一个要限流的异步操作函数,

```js
async function asyncread() {
    return await new Promise((s) => {
        setTimeout(() => {
            s("data:" + Math.random());
        }, Math.random() * 2000);
    });
}

const limitread = asynclimiter.asyncwrap(asyncread);
```

进行大批量异步操作的限流

```js
for (let i = 0; i < 1000; i++) {
    setTimeout(() => {
        limitread().then(console.log);
    }, Math.random() * 5000);
}
```

# 原理

通过调用被限流的异步函数,将调用传入内部队列。如果活跃调用小于最大并发数，将会被取出直接执行，反之则继续呆在队列中。

当一个异步调用结束的时候，会从队列前取出调用执行。以此来保证异步调用的活跃量不高于限定值。

# API

https://github.com/masx200/async-task-current-limiter/blob/master/dist/index.d.ts



## `AsyncLimiterClass(max)`

1.当成函数使用

2.当成类使用

传入参数为限流器设定最大同时执行的任务数

## `asynclimiter.target`

发布订阅的事件目标对象

https://github.com/masx200/event-emitter-target

### 事件 'free'

在限流器空闲的时候触发

可监听的参数类型为 `statusdata`接口

### 事件 'full'

在限流器占满的时候触发

可监听的参数类型为 `statusdata`接口

```ts
interface statusdata {
    status: 空闲状态;
    queue: {
        max: number;
        current: number;
    };
    limiter: {
        max: number;
        current: number;
    };
}
```

## `asynclimiter.asyncwrap(fun)`

异步限流包装器

传入函数必须返回一个`Promise`,

返回一个被限流的异步操作函数

## `asynclimiter.status()`

获取限流器状态的函数,返回'free'或者'full'

## `asynclimiter.limiter.max`

异步限流器的最大同时执行的任务数

## `asynclimiter.limiter.current`

异步限流器的当前同时执行的任务数

## `asynclimiter.queue.max`

异步限流器的异步任务队列总数

## `asynclimiter.queue.current`

异步限流器的异步任务队列中已经执行的任务个数

# 应用解决问题例子

使用异步限流器解决同时打开过多文件的报错

```ts
import fs from "fs";
import AsyncLimiterClass from "@masx200/async-task-current-limiter";
const asynclimiter = AsyncLimiterClass(50);

declare const files: string[];
const limitreadfile = asynclimiter.asyncwrap(fs.promises.readFile);
files.forEach(async (file) => {
    const buf = await limitreadfile(file);
    console.log(buf);
});
```
