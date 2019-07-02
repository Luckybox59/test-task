import VueRouter from 'vue-router'
import Profile from './pages/Profile'
import Balance from './pages/Balance'
import History from './pages/History'
import Register from './pages/Register'
import Login from './pages/Login'
import My from './pages/My'
import Account from './pages/Account'

export default new VueRouter({
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/my', component: My, children: [
      { path: 'profile', name: 'profile', component: Profile },
      { path: 'balance', component: Balance },
      { path: 'billing_history', component: History },
      { path: 'account', component: Account }
    ]}
  ],
  mode: 'history',
  linkActiveClass: 'active'
})