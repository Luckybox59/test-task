<template>
  <div>
    <h2>Баланс</h2>
    <div class="row justify-content-around text-center">

      <div @mouseenter="activatePayment" :class="{ active: payment.isActive }" class="col-lg-3 border border-primary rounded">
        <form @submit.prevent="onSubmit((b, p, d) => b - p)" data-action="Оплата счета">
          <div class="form-group mt-3">
            <input v-model="payment.data" type="text" class="form-control disabled" placeholder="Введите сумму" :disabled="!payment.isActive">
            <button type="submit" class="btn btn-block btn-primary mt-3" :disabled="!payment.isActive">Оплатить</button>
          </div>
        </form>
      </div>

      <div @mouseenter="activateDeposit" :class="{ active: deposit.isActive }" class="col-lg-3 border border-primary rounded">
        <form @submit.prevent="onSubmit((b, p, d) => b + d)" data-action="Пополнение счета">
          <div class="form-group mt-3">
            <input v-model="deposit.data" type="text" class="form-control" placeholder="Введите сумму" :disabled="!deposit.isActive">
            <button type="submit" class="btn btn-block btn-primary mt-3" :disabled="!deposit.isActive" data-action="Пополнение счета">Пополнить</button>
          </div>
        </form>
      </div>

      <div class="col-lg-3 border border-primary rounded">
        <h3 class="mt-3">Счет</h3>
        <h4 class="mt-3">{{ balance }}</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: '',
      payment: {
        data: '',
        isActive: false,
      },
      deposit: {
        data: '',
        isActive: false,
      },
    };
  },
  methods: {
    activatePayment() {
      this.payment.isActive = true;
      this.deposit.isActive = false;
    },
    activateDeposit() {
      this.deposit.isActive = true;
      this.payment.isActive = false;
    },
    onSubmit(calculateNewBalance) {
      const newBalance = calculateNewBalance(+this.balance, +this.payment.data, +this.deposit.data);
      this.balance = newBalance;
      const { action } = event.target.dataset;
      this.$store.dispatch('userEditTransactions', { balance: newBalance, action });
    },
  },
  mounted() {
    this.$store.dispatch('balanceRequest')
      .then((resp) => {
        this.balance = resp.data.balance;
      });
  },
};
</script>