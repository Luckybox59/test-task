import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    authLogout({ commit }) {
      return new Promise((resolve) => {
        commit('authLogout');
        sessionStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    },
    authRequest({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('authRequest');
        axios.post('http://localhost:3000/session/new', user)
          .then((resp) => {
            const { token } = resp.data;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = token;
            commit('authSuccess', token);
            resolve(resp);
          })
          .catch((err) => {
            commit('authError');
            sessionStorage.removeItem('token');
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
