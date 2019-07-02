<template>
  <div>
    <table class="table table-striped">
      <tbody>
        <tr>
          <th>Дата</th>
          <th>Операция</th>
        </tr>
        <tr v-for="record in records">
          <td>{{ record.date }}</td>
          <td>{{ record.action }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: ['records']
  }
</script>