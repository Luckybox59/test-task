import VueRouter from 'vue-router'
import Profile from './pages/Profile'
import Balance from './pages/Balance'
import History from './pages/History'

export default new VueRouter({
  routes: [
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/balance',
      component: Balance
    },
    {
      path: '/billing_history',
      component: History
    }
  ],
  mode: 'history'
})