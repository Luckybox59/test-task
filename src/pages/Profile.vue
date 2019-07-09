<template>
  <div>
    <h3>Профиль</h3>
    <form @submit.prevent="onSubmit">
      <label>Имя</label>
      <input type="text" class="form-control" v-model.lazy="user.firstName" required>

      <label class="mt-3">Фамилия</label>
      <input type="text" class="form-control" v-model.lazy="user.lastName">
      
      <label class="mt-3">Email</label>
      <input type="text" class="form-control" v-model.lazy="user.email" aria-describedby="inputGroupPrepend2" required>
      
      <label class="mt-3">Город</label>
      <input type="text" class="form-control" v-model.lazy="user.city">
      
      <label class="mt-3">Страна</label>
      <input type="text" class="form-control" v-model.lazy="user.country">
      
      <label class="mt-3">Обо мне</label>
      <textarea type="text" class="form-control" v-model.lazy="user.about"></textarea>

      <button class="btn btn-primary mt-3" type="submit">Сохранить</button>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          city: '',
          about: '',
        }
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('userEditProfile', this.user)
      }
    },
    mounted() {
      this.$store.dispatch('userRequest')
       .then((resp) => this.user = {...this.user, ...resp.data })
    }
  }
</script>