<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-2">Edit Product</h1>
      <router-link class="btn btn-outline-primary" :to="{ name: 'products' }">
        Cancel
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditProduct",
  data() {
    return {};
  },
};
</script>
