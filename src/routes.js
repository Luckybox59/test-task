import VueRouter from 'vue-router'
import store from './store'
import Profile from './pages/Profile'
import Balance from './pages/Balance'
import History from './pages/History'
import Register from './pages/Register'
import Login from './pages/Login'
import My from './pages/My'
import Account from './pages/Account'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return;
  }
  next({ name: 'login'})
}

const router = new VueRouter({
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/my', name: 'my', component: My, beforeEnter: ifAuthenticated, children: [
      { path: 'profile', name: 'profile', component: Profile },
      { path: 'balance', name: 'balance', component: Balance },
      { path: 'billing_history', name: 'history', component: History },
      { path: 'account', name: 'account', component: Account }
    ]}
  ],
  mode: 'history',
  linkActiveClass: 'active',
})

export default router;