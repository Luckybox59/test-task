<template>
  <div class="container">
      <div class="container my-5">
          <div class="row">
            <div class="col-12 col-lg-3">
              <div class="card shadow-sm">
                <div class="card-header font-weight-bold text-muted">
                  Настройки
                </div>
                <div class="list-group list-group-flush">
                    <router-link class="nav-link list-group-item list-group-item-action" to="/my/profile">Профиль</router-link>
                    <router-link class="nav-link list-group-item list-group-item-action" to="/my/account">Аккаунт</router-link>
                    <router-link class="nav-link list-group-item list-group-item-action" to="/my/balance">Баланс</router-link>
                    <router-link class="nav-link list-group-item list-group-item-action" to="/my/billing_history">История оплат</router-link>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-9 mt-5 mt-lg-0">
              <router-view></router-view>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        info: null,
        currentItem: 'Профиль'
      }
    },
    filters: {
      currencydecimal(value) {
        return value.toFixed(2)
      }
    }
  }
</script>
<style scope>
    .nav {
      box-shadow: 0 0 5px 0 grey;
    }
</style>