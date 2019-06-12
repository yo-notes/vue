export class Dep {
  constructor() {
    this.subs = [];
  }
  depend() {
    Dep.target && this.subs.push(Dep.target);
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}
