<template>
  <div class="container mt-5">
    <div class="row justify-content-center text-center">
      <div class="col-lg-5 border border-primary rounded shadow-lg">
        <h2 class="justify-content-center mt-5">Вход</h2>
        <form v-on:submit.prevent="onSubmit" class="needs-validation mt-3 mb-5 mr-2 ml-2">
          <div class="form-group">
            <input v-model="user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="email" required>
          </div>
          <div class="form-group">
            <input v-model="user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" required>
          </div>
          <button type="submit" class="btn btn-block btn-primary">Вход</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('authRequest', this.user)
          .then(() => this.$router.push({ name: 'profile' }))
      }
    }
  }
</script>