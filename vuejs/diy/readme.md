# DIY a vuejs

## 设计模式：观察者模式

参见：[observer-pattern]()。

## 

> 每个组件实例都对应一个 `watcher` 实例，它会在组件渲染的过程中把「接触」过的数据属性记录为依赖。之后当依赖项的 `setter` 触发时，会通知 `watcher`，从而使它关联的组件重新渲染。

![](https://vuejs.org/images/data.png?_sw-precache=5de7af21d4c2de951720c006f84b98fc)

关键点就在于：依赖如何收集和变化时触发渲染？

```js
// <html><body><div id="app"></div></body></html>

new Vue({
  el: '#app',
  data() {
    return {
      message: 'init message'
    }
  },
  template: `
  <div>
    <p>MSG is:{{message}}</p>
  </div>
  `,
})
```

每一个属性都是一个主题，维护者自己的观察者列表。

