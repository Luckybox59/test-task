import VueRouter from 'vue-router';
import store from './store';
import Profile from './pages/Profile.vue';
import Balance from './pages/Balance.vue';
import History from './pages/History.vue';
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import My from './pages/My.vue';
import Account from './pages/Account.vue';

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next({ name: 'login' });
};

const router = new VueRouter({
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/my', name: 'my', component: My, beforeEnter: ifAuthenticated,
      children: [
        { path: 'profile', name: 'profile', component: Profile },
        { path: 'balance', name: 'balance', component: Balance },
        { path: 'billing_history', name: 'history', component: History },
        { path: 'account', name: 'account', component: Account },
      ],
    },
  ],
  mode: 'history',
  linkActiveClass: 'active',
});

export default router;
