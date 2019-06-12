import { Dep } from './Dep';

export class Observer {
  constructor(target) {
    if (!target) return;
    // already observed
    if (target.__ob__) return;

    if (typeof target === 'object') {
      if (Array.isArray(target)) {
        // array
      } else {
        Object.entries(target).forEach(([key, value]) => {
          defineReactive(target, key, value);
        });
      }
    }

    target.__ob__ = this;
  }
}

function defineReactive(obj, key, val) {
  const descriptor = Object.getOwnPropertyDescriptor(obj, key);

  if (!descriptor || !descriptor.configurable) return;

  const dep = new Dep();
  const { get: getter, set: setter } = descriptor;

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 是否需要收集依赖，防止重复收集
      if (Dep.target) {
        console.log(`trigger reactive getter for KEY: ${key}`);
        dep.depend();
        val = getter ? getter.call(obj) : val;
      }

      return val;
    },
    set: function reactiveSetter(newVal) {
      console.log(`trigger reactive setter for KEY: ${key}`);
      const oldVal = getter ? getter.call(obj) : val;
      if (oldVal === newVal || (oldVal !== oldVal && newVal !== newVal)) return;

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      // notify
    }
  });
}
