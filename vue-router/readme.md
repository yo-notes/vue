# Vue Router 笔记

[![](https://img.shields.io/badge/Vue%20Router-v3.0.3-brightgreen.svg)](https://github.com/vuejs/vue-router/releases/tag/v3.0.3)


> 阅读源码前请先熟悉 vue-router 的使用。

## 项目结构

```
├── components  // 组件
│   ├── link.js   // route-link的实现
│   └── view.js   // route-view的实现
├── create-matcher.js  // 创建匹配
├── create-route-map.js  // 创建路由的映射
├── history  // 操作浏览器记录的一系列内容
│   ├── abstract.js  // 非浏览器的history
│   ├── base.js    // 基本的history
│   ├── hash.js    // hash模式的history
│   └── html5.js   // html5模式的history
├── index.js   // 入口文件
├── install.js  // 插件安装的方法
└── util   // 工具类库
    ├── async.js    // 异步操作的工具库
    ├── dom.js    // dom相关的函数
    ├── location.js     // 对location的处理
    ├── misc.js     // 一个工具方法
    ├── params.js   // 处理参数
    ├── path.js     // 处理路径
    ├── push-state.js  // 处理html模式的 pushState
    ├── query.js  //对query的处理
    ├── resolve-components.js  //异步加载组件
    ├── route.js  // 路由
    ├── scroll.js  //处理滚动
    └── warn.js  // 打印一些警告

```
