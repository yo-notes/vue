new Vue({
  template: `<div>{{arr}}{{aComputed}}</div>`,
  el: '#app',
  props: {
    aProp: {
      type: String
    }
  },
  computed: {
    aComputed() {
      return this.aProp + 'a computed value'
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