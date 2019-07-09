<template>
  <div>
    <ul class="nav justify-content-end">
      <li v-if="!isAuthenticated" class="nav-item">
        <router-link class="nav-link" to="/login">Вход</router-link>
      </li>
      <li v-if="!isAuthenticated" class="nav-item">
        <router-link class="nav-link" to="/register">Регистрация</router-link>
      </li>
      <li v-if="isAuthenticated" @click="logout" class="nav-item">
        <button type="button" class="btn btn-link">Выйти</button>
      </li>
    </ul>
    <router-view @reg-success="signIn=$event.signIn"></router-view>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

  export default {
    computed: mapGetters(['isAuthenticated']),
    methods: {
      logout() {
        this.$store.dispatch('authLogout')
          .then(() => this.$router.push({ name: 'login' }))
      }
    }
  }
</script>
<style scope>
  .nav {
    box-shadow: 0 0 5px 0 grey;
  }
  button {
    text-decoration: none !important;
  }
</style>