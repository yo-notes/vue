import { Dep } from './dep.js';

export class Observer {
  constructor(target) {
    this.observe(target);
  }
  observe(target) {
    if (typeof target !== 'object') return;
    Object.entries(target).forEach(([key, val]) => {
      defineReactive(target, key, val);
      this.observe(target[key]);
    });
  }
}

function defineReactive(target, key, val) {
  const descriptor = Object.getOwnPropertyDescriptor(target, key);
  if (!descriptor) return;

  const dep = new Dep()

  const { get: getter, set: setter } = descriptor;

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      dep.depend()
      return getter ? getter.call(target) : val;
    },
    set: function reactiveSetter(newVal) {
      if (val === newVal || (Number.isNaN(newVal) && Number.isNaN(val))) return;

      if (setter) {
        setter.call(target, newVal);
      } else {
        val = newVal;
      }

      // 如何通知对此属性关注的观察者？
      dep.notify()
    }
  });
}
