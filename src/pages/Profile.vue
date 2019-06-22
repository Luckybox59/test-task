<template>
  <div>
<h3>{{ category }}</h3>
<form @submit.prevent="onSubmit">
        <label for="validationDefault01">Имя</label>
        <input type="text" class="form-control" id="validationDefault01" v-model.lazy="firstName" required>

        <label class="mt-3" for="validationDefault02">Фамилия</label>
        <input type="text" class="form-control" id="validationDefault02" v-model.lazy="lastName" required>
        
        <label class="mt-3" for="validationDefaultUsername">Email</label>
        <input type="text" class="form-control" id="validationDefaultUsername" v-model.lazy="email" aria-describedby="inputGroupPrepend2" required>
        
        <label class="mt-3" for="validationDefault03">Город</label>
        <input type="text" class="form-control" id="validationDefault03" v-model.lazy="city" required>
        
        <label class="mt-3" for="validationDefault04">Страна</label>
        <input type="text" class="form-control" id="validationDefault04" v-model.lazy="country" required>
        
        <label class="mt-3" for="validationDefault05">Обо мне</label>
        <textarea type="text" class="form-control" id="validationDefault05" v-model.lazy="about" required>{{ about }}</textarea>
        <button class="btn btn-primary mt-3" type="submit">Сохранить</button>
  </form>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    props: [
      'category'
    ],
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        city: '',
        about: '',
        id: ''
      }
    },
    methods: {
      onSubmit() {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          country: this.country,
          city: this.city,
          about: this.about,
          id: this.id,
        }
        axios.put(`http://localhost:3000/users/${user.id}`, user)
          .catch(e => console.log(e));
      }
    },
    mounted() {
      axios
        .get('http://localhost:3000/users/2')
        .then(response => {
          Object.assign(this.$data, response.data);
        })
        .catch(e => console.log(e));
    }
  }
</script>