<template>
  <div>
    <h2>История оплат</h2>

    <HistoryTable :records="items"></HistoryTable>
    
    <Paginate
      v-model="page"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Назад'"
      :next-text="'Вперед'"
      :margin-pages="1"
      :container-class="'pagination pagination-sm'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :next-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-link-class="'page-link'"
      />
  </div>
</template>
<script>
import HistoryTable from '../components/HistoryTable.vue';
import paginationMixin from '../mixins/pagination.mixin';

export default {
  mixins: [
    paginationMixin,
  ],
  data() {
    return {
      records: [],
    };
  },
  mounted() {
    this.$http({ method: 'GET', url: 'http://localhost:3000/users/history' })
      .then((resp) => {
        this.records = resp.data;
      });
  },
  watch: {
    records(value) {
      this.setupPagination(value);
    },
  },
  components: {
    HistoryTable,
  },
};  
</script>