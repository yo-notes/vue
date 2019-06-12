new Vue({
  el: '#app',
  template: `<div class="test">
    <section><h2>data</h2><p>{{dataDemo}}</p></section>
  </div>`,
  data() { return { dataDemo: 'DATA'}}
})