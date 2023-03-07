<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-2">Add Product</h1>
      <router-link class="btn btn-outline-primary" :to="{ name: 'products' }">
        Back
      </router-link>
    </div>
    <ProductFrom></ProductFrom>
  </div>
</template>

<script>
import ProductFrom from "@/components/ProductForm.vue";

export default {
  name: "AddProduct",
  components: {
    ProductFrom,
  },
  data() {
    return {};
  },
};
</script>
