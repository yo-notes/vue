let uid = 0
class Dep {
  constructor() {
    this.subs = []
    this.$uid = uid ++
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  removeSub(sub) {
    this.subs.remove(sub)
  }

  depend() {
    Dep.target = this
  }

  notify() {
    for(let sub of this.subs) {
      sub.update()
    }
  }

  static target = null
}