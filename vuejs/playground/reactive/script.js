Vue.component('slot-demo', {
  template: `
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>`,
  data() { return { name: 'slot-DEMO'} },
});

new Vue({
  template: `<div>
    <p>{{arr}}{{aComputed}}</p>
    <div>
      <slot-demo>
        <p>default slot</p>
        <template #header>
          <h2>slot-header</h2>
        </template>
      </slot-demo>
    </div>
  </div>`,
  el: '#app',
  props: {
    aProp: {
      type: String
    }
  },
  computed: {
    aComputed() {
      return this.aProp + 'a computed value';
    }
  },
  data() {
    return {
      obj: {
        name: 'data: object',
        children: []
      },
      arr: [{ a: 1 }]
    };
  },
  methods: {
    onDebug() {
      console.log('method: debug');
    }
  },
  beforeCreate() {
    console.log('hook: beforeCreate');
  }
});