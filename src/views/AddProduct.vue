<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h1 class="mb-2">Add Product</h1>
      <router-link class="btn btn-outline-primary" :to="{ name: 'products' }">
        Back
      </router-link>
    </div>
    <ProductFrom @on-submit="save"></ProductFrom>
  </div>
</template>

<script>
import ProductFrom from "@/components/ProductForm.vue";
import { mapActions } from "vuex";

export default {
  name: "AddProduct",
  components: {
    ProductFrom,
  },
  data() {
    return {};
  },
  computed: {
    alert() {
      return this.$store.state.alert.show;
    }
  },
  methods: {
    ...mapActions(['saveProducts']),
    async save(payload) {
      await this.saveProducts(payload);
      if (this.alert) {
        this.$router.push({ name: 'products'})
      }
    },
  },
};
</script>
