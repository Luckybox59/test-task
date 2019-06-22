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
                  <div v-on:click="select">
                    <router-link class="nav-link list-group-item list-group-item-action" to="/profile">Профиль</router-link>
                  </div>
                  <div v-on:click="select">
                    <router-link class="nav-link list-group-item list-group-item-action" to="/balance">Баланс</router-link>
                  </div>
                  <div v-on:click="select">
                    <router-link class="nav-link list-group-item list-group-item-action" to="/billing_history">История оплат</router-link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-9 mt-5 mt-lg-0">
              <router-view v-bind:category="currentItem"></router-view>
            </div>
          </div>
        </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        info: null,
        currentItem: 'Профиль'
      }
    },
    methods: {
      select(e) {
        this.currentItem = e.target.textContent;
      }
    },
    filters: {
      currencydecimal(value) {
        return value.toFixed(2)
      }
    }
  }
</script>