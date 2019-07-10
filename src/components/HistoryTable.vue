<template>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <th>Дата</th>
          <th>Операция</th>
        </tr>
        <tr v-for="(record, index) in records" :key="index">
          <td>{{ record.date }}</td>
          <td>{{ record.action }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ['records'],
};
</script>