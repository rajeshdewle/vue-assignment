<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-2">Edit Product</h1>
      <router-link class="btn btn-outline-primary" :to="{ name: 'products' }">
        Cancel
      </router-link>
    </div>
    <ProductFrom
      @on-submit="update"
      :existingData="product"
      v-if="product"
    />
  </div>
</template>

<script>
import ProductFrom from "@/components/ProductForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "EditProduct",
  components: {
    ProductFrom,
  },
  data() {
    return {
      formData: null,
    };
  },
  computed: {
    ...mapState(['product']),
  },
  mounted() {
    this.getProduct(this.$route.params.id);
  },
  methods: {
    ...mapActions(['getProduct', 'updateProducts']),
    update(payload) {
      this.updateProducts(payload);
    },
  },
};
</script>
