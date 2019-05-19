new Vue({
  el: '#app',
  template: `<div>
    <section><h2>data</h2><p>{{dataDemo}}</p></section>
  </div>`,
  data() { return { dataDemo: 'DATA'}}
})