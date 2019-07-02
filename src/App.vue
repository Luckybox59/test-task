<template>
  <div>
  <ul class="nav justify-content-end">
      <li v-if="!signIn" class="nav-item">
        <router-link class="nav-link" to="/my">Войти</router-link>
      </li>
    <li v-if="!signIn" class="nav-item">
      <router-link class="nav-link" to="/login">Вход</router-link>
    </li>
    <li v-if="!signIn" class="nav-item">
      <router-link class="nav-link" to="/register">Регистрация</router-link>
    </li>
    <li v-if="signIn" @click="signOut" class="nav-item">
      <a href="#" class="nav-link">Выйти</a>
    </li>
  </ul>
  <router-view @reg-success="signIn = $event.signIn"></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        signIn: false
      }
    },
    methods: {
      signOut() {
        this.signIn = false;
        this.$router.push({ name: 'login' });
      }
    }
  }
</script>
<style scope>
  .nav {
    box-shadow: 0 0 5px 0 grey;
  }
</style>