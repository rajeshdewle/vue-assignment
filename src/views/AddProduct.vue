<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-2">Add Product</h1>
      <router-link class="btn btn-outline-primary" :to="{ name: 'products' }">
        Back
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {};
  },
};
</script>
