import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)
Vue.component('Paginate', Paginate)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
