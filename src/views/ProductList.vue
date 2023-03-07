<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-2">Products</h1>
    <router-link class="btn btn-primary" :to="{ name: 'addProduct' }">
      Add Product
    </router-link>
  </div>
  <div
    v-if="loading"
    style="height: 240px;"
    class="d-flex justify-content-center mb-3 align-items-center"
  >
    <div class="spinner-border text-primary">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">SKU</th>
          <th scope="col">Product</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td scope="row">{{ product.product_sku }}</td>
          <td scope="row">{{ product.product_name }}</td>
        </tr>
      </tbody>
    </table>
    <SimplePagination />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SimplePagination from '@/components/SimplePagination.vue';

export default {
  name: "ProductList",
  components: {
    SimplePagination,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['products', 'loading']),
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(['getProducts'])
  },
};
</script>
