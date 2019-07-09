import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './routes'
import store from './store'

const token = sessionStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

Vue.use(VueRouter)
Vue.component('Paginate', Paginate)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
