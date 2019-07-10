import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    userCreateNew({ dispatch }, user) {
      return axios.post('http://localhost:3000/users/new', user)
        .then(() => {
          console.info('Пользователь успешно создан!');
          return dispatch('authRequest', user);
        })
        .catch(e => console.error('Пользователь не создан! ' + e.message));
    },
    userEditTransactions(ctx, transactionProps) {
      return axios({ method: 'PATCH', url: 'http://localhost:3000/users/edit/transactions', data: transactionProps });
    },
    userEditPassword(ctx, user) {
      return axios({ method: 'PATCH', url: 'http://localhost:3000/users/edit/password', data: user });
    },
    userEditProfile(ctx, user) {
      axios({ method: 'PUT', url: 'http://localhost:3000/users/edit', data: user });
    },
    userRequest() {
      return axios({ method: 'GET', url: 'http://localhost:3000/users' });
    },
    balanceRequest() {
      return axios({ method: 'GET', url: 'http://localhost:3000/users/balance' });
    },
    historyRequest() {
      return axios({ method: 'GET', url: 'http://localhost:3000/users/history' });
    },
    authLogout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('authLogout');
        sessionStorage.removeItem('token'); // clear your user's token from localstorage
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    authRequest({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('authRequest');
        axios({ url: 'http://localhost:3000/session/new', data: user, method: 'POST' })
          .then((resp) => {
            const token = resp.data.token;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('authSuccess', token);
            resolve(resp);
          })
          .catch((err) => {
            commit('authError');
            sessionStorage.removeItem('token'); // if the request fails, remove any possible user token if possible
            reject(err);
          });
      });
    },
  },
  mutations: {
    authRequest(state) {
      state.status = 'loading';
    },
    authSuccess(state, token) {
      state.status = 'success';
      state.token = token;
    },
    authError(state) {
      state.status = 'error';
    },
    authLogout(state) {
      state.status = 'logout';
      state.token = null;
    },
  },
  state: {
    token: sessionStorage.getItem('token') || '',
    status: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
});
