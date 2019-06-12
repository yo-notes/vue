import { Compile } from './compile.js';
import { Observer } from './observer.js';

export class MVVM {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;

    if (this.$el) {
      // 数据 reactive 化
      new Observer(this.$data);

      new Compile(this.$el, this);
    }
  }
}
