<template>
  <div>
    <h3>Аккаунт</h3>
    <div v-if="message" class="alert alert-info" role="alert">
      {{ message }}
    </div>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input type="password" class="form-control" v-model="user.currentPassword" placeholder="Старый пароль" required>
      </div>
      <div class="form-group">
        <input type="password" class="form-control" v-model="user.newPassword" placeholder="Новый пароль" required>
      </div>
      <div class="form-group"> 
        <input type="password" class="form-control" v-model="user.confirmNewPassword" placeholder="Подтвердить" required>
      </div>
      <button class="btn btn-primary mt-3" type="submit">Изменить пароль</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      message: '',
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('userEditPassword', this.user)
        .then((resp) => {
          this.message = resp.data.message;
        });
    },
  },
};
</script>