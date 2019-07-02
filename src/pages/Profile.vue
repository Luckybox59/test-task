<template>
  <div>
<h3>Профиль</h3>
<form @submit.prevent="onSubmit">
        <label for="validationDefault01">Имя</label>
        <input type="text" class="form-control" id="validationDefault01" v-model.lazy="user.firstName" required>

        <label class="mt-3" for="validationDefault02">Фамилия</label>
        <input type="text" class="form-control" id="validationDefault02" v-model.lazy="user.lastName" required>
        
        <label class="mt-3" for="validationDefaultUsername">Email</label>
        <input type="text" class="form-control" id="validationDefaultUsername" v-model.lazy="user.email" aria-describedby="inputGroupPrepend2" required>
        
        <label class="mt-3" for="validationDefault03">Город</label>
        <input type="text" class="form-control" id="validationDefault03" v-model.lazy="user.city" required>
        
        <label class="mt-3" for="validationDefault04">Страна</label>
        <input type="text" class="form-control" id="validationDefault04" v-model.lazy="user.country" required>
        
        <label class="mt-3" for="validationDefault05">Обо мне</label>
        <textarea type="text" class="form-control" id="validationDefault05" v-model.lazy="user.about" required>{{ user.about }}</textarea>
        <button class="btn btn-primary mt-3" type="submit">Сохранить</button>
  </form>
  <p>{{ response }}</p>
  </div>
</template>
<script>
  import axios from 'axios'

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
          id: '',
        },
        response: '',
      }
    },
    methods: {
      onSubmit() {
        const user = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          country: this.user.country,
          city: this.user.city,
          about: this.user.about,
          id: this.user.id,
        }
        //axios.put(`http://localhost:3000/users/${user.id}`, user)
        //  .catch(e => console.log(e));
      }
    },
    mounted() {
      axios
        .get('http://localhost:3000/register')
        .then(response => {
          console.log(response);
          //this.response = response;
          //Object.assign(this.$data.user, response.data);
        })
        .catch(e => console.log(e));
    }
  }
</script>