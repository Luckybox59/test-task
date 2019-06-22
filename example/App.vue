<template>
  <div class="container">
    <h2>{{ sumofNumbers }}</h2>
    <app-progress v-bind:max="maxNumbers" v-bind:val="numbers.length"></app-progress>
    <button v-bind:disabled="done" class="btn btn-primary" v-on:click="addNumber">
      Add number
    </button>
    <button class="btn btn-primary" v-on:click="numbers.pop()">
        Delete number
      </button>
    <hr>
    <ul class="list-group">
      <li class="list-group-item" v-for="number in numbers">{{ number }}</li>
    </ul>
  </div>

  <input type="text" v-model.lazy="name">
    <p>{{ name }}</p>
    <input type="text" v-model.number="age">
    <p>{{ age }}</p>
    <textarea v-model="textarea"></textarea>
    <p>{{ textarea }}</p>
    <label>
      <input type="radio" value="instagram" v-model="social"> Instagram
    </label>
    <label>
      <input type="radio" value="vk" v-model="social"> Vk
    </label>
    <label>
      <input type="radio" value="facebook" v-model="social"> Facebook
    </label>
    <hr>
    <p>{{ social }}</p>

  </div>
</template>
<script>
  import Progress from './app-progress.vue';

  export default {
    data() {
      return {
        name : 'World!',
        showH2: true,
        numbers: [],
        maxNumbers: 10,
      }
    },
    methods: {
      addNumber() {
        if (!this.done)
        this.numbers.push(Math.random());
      }
    },
    computed: {
      done() {
        return this.numbers.length >= this.maxNumbers;
      },
      sumofNumbers() {
        return this.numbers.reduce((acc, i) => acc + i, 0);
      }
    },
    components: {
      appProgress: Progress,
    }
  }
</script>
<style>
  .container {
    color: red;
  }
</style>