
const data = {
  a: {
    aa: 1
  },
  b: 1
}

function walk (data) {
  for (let key in data) {
    const dep = []
    let val = data[key]
    if (Object.prototype.toString.call(val) === '[object Object]') {
      walk(val)
    }
    Object.defineProperty(data, key, {
      set (newVal) {
        if (newVal == val) {
          return
        }
        dep.forEach(fn => fn(newVal, val))
        val = newVal
      },
      get () {
        dep.push(Target)
        return val
      }
    })
  }
}

walk(data)

let Target = null

function $watch (exp, fn) {
  Target = fn
  let pathArr, obj = data
  if (/\./.test(exp)) {
    pathArr = exp.split('.')
    pathArr.forEach(p => {
      obj = obj[p]
    })
    return
  }
  data[exp]
}
$watch('a', (newVal, oldVal) => { console.log(`watch a, newVal: ${newVal}, oldVal: ${oldVal}`) })
$watch('a.aa', (newVal, oldVal) => { console.log(`watch a.aa, newVal: ${newVal}, oldVal: ${oldVal}`) })
$watch('b', (newVal, oldVal) => { console.log(`watch b, newVal: ${newVal}, oldVal: ${oldVal}`) })

data.a.aa = 2