import { Dep } from './dep.js';

export class Watcher {
  constructor(vm, getter, cb) {
    this.cb = cb;
    Dep.target = this;
    this.getter = getter;
    getter(); // 收集依赖
    Dep.target = null
  }

  update() {
    // 执行回调
    this.cb(this.getter());
  }
}
