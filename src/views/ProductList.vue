<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-2">Products</h1>
    <router-link class="btn btn-primary" :to="{ name: 'addProduct' }">
      Add Product
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {};
  },
};
</script>
