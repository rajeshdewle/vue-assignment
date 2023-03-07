<template>
  <div>
    <input
      class="form-control py-2 my-2"
      id="search"
      placeholder="Type to search..."
      v-model="searchQuery"
      @keyup="search"
    >
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  mounted() {
    this.searchQuery = this.$route.query.search;
  },
  methods: {
    ...mapActions(['getProducts']),
    search() {
      this.$router.push({ query: { search: this.searchQuery} });
      this.getProducts({ search: `product_name_like=${this.searchQuery}` });
    }
  }
};
</script>