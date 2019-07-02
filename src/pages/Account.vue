<template>
  <div>
    <h3>Аккаунт</h3>
<form @submit.prevent="onSubmit">
  <div class="form-group">
    <input type="text" class="form-control" id="validationDefault01" v-model="currentPassword" placeholder="Старый пароль" required>
  </div>
    <div class="form-group">
    <input type="text" class="form-control" id="validationDefault02" v-model="newPassword" placeholder="Новый пароль" required>
  </div>
  <div class="form-group"> 
    <input type="text" class="form-control" id="validationDefaultUsername" v-model="confirmNewPassword" placeholder="Подтвердить" required>
  </div>
    <button class="btn btn-primary mt-3" type="submit">Изменить пароль</button>
  </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  }
</script>