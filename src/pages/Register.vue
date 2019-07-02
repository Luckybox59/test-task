<template>
<div class="container mt-5">
  <div class="row justify-content-center text-center">
    <div class="col-lg-5 border border-primary rounded shadow-lg">
      <h2 class="justify-content-center mt-5">Регистрация</h2>
  <form v-on:submit.prevent="onSubmit" class="needs-validation mt-3 mb-5 mr-2 ml-2">
  <div class="form-group">
    <input v-model="user.email" type="email" class="form-control" placeholder="email" required>
  </div>
  <div class="form-group">
    <input v-model="user.name" type="name" class="form-control" placeholder="Имя" required>
  </div>
  <div class="form-group">
    <input v-model="user.password" type="password" class="form-control" placeholder="Пароль" required>
  </div>
  <button type="submit" class="btn btn-block btn-primary">Зарегистрироваться</button>
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
          name: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('reg-success', { signIn: true })
        axios.post('http://localhost:3000/register', this.user)
          .then((response) => {
            console.log(response)
          })
          .catch(e => console.log(e))
      }
    }
  }
</script>