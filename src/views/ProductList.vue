<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-2">Products</h1>
    <router-link class="btn btn-primary" :to="{ name: 'addProduct' }">
      Add Product
    </router-link>
  </div>
  <div>
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "ProductList",
  data() {
    return {};
  },
  computed: {
    ...mapState(['products']),
  },
  created() {
    this.getProducts();
  },
  methods: {
    ...mapActions(['getProducts'])
  },
};
</script>
