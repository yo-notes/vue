# code snippet from Vue



```js
const _toString = Object.prototype.toString

export function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
```


* 先声明 export 再定义

```js
// so neat
export let mark
export let measure
// ...
const perf = inBrowser && window.performance
mark = tag => perf.mark(tag)
measure = (name, startTag, endTag) => { }
```

* 单值和多值入参

```js
Vue.prototype.$on = function (event: string | Array<string>, fn: Function): Component {
  const vm: Component = this
  if (Array.isArray(event)) {
    for (let i = 0, l = event.length; i < l; i++) {
      vm.$on(event[i], fn)
    }
  } else {
    (vm._events[event] || (vm._events[event] = [])).push(fn)
  }
}
```

* 正则

```js
val = cached(fn) // function fn(key) { return value }

function cached(fn) {
  const cache = {};
  return (function cachedFn(key) {
    const hit = cache[key]
    return hit || cache[key] = fn(key)
  })
}
/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g // TODO: 这里注意带 g 的每次匹配 lastIndex 的变化
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```

* native code 函数判断

```js
export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}
```