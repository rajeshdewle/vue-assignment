<template>
  <nav aria-label="pagination" class="d-flex justify-content-between">
    <button
      type="button"
      :disabled="!pagination.prev"
      class="btn btn-outline-primary"
      @click="paginate(pagination.prev)"
    >Previous</button>
    <button
      type="button"
      :disabled="!pagination.next"
      class="btn btn-outline-primary"
      @click="paginate(pagination.next)"
    >Next</button>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "SimplePagination",
  computed: {
    ...mapGetters(['pagination']),
  },
  methods: {
    ...mapActions(['getProducts']),
    paginate(page) {
      const url = new URL(`${page}`);
      const searchParams = url.searchParams;
      this.getProducts({ page: searchParams.get('_page') });
    },
  },
};
</script>
