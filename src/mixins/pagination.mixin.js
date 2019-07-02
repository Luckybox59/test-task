import { chunk } from 'lodash';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    changePage(pageNum) {
      this.$router.push(`${this.$route.path}?page=${pageNum}`);
      this.items = this.allItems[pageNum - 1];
    },
    setupPagination(incomingItems) {
      this.allItems = chunk(incomingItems, this.pageSize);
      this.pageCount = this.allItems.length;
      this.changePage(this.page);
    }
  }
}