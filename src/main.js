import Vue from 'vue'
import App from './App.vue'
//引入自定义mini-vue-router
import router from './mini-vue-router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
