<template>
  <div class="d-flex justify-content-between align-items-center">
    <h1 class="mb-2">Products</h1>
    <router-link class="btn btn-primary" :to="{ name: 'addProduct' }">
      Add Product
    </router-link>
  </div>
  <SearchForm />
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
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td scope="row">{{ product.product_sku }}</td>
          <td scope="row">{{ product.product_name }}</td>
          <td scope="row">
            <router-link
              class="btn btn-link p-0"
              :to="{ name: 'editProduct', params: { id: product.id }}"
            >
              <IconEdit class="text-success"/>
            </router-link>
            <button
              title="Delete"
              type="button"
              class="btn btn-link p-0 ms-4"
              @click="deleteProduct(product.id)"
            >
              <IconTrash class="text-danger"/>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <SimplePagination />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SearchForm from '@/components/SearchForm.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import SimplePagination from '@/components/SimplePagination.vue';

export default {
  name: "ProductList",
  components: {
    IconTrash,
    IconEdit,
    SearchForm,
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
    ...mapActions(['getProducts', 'deleteProduct'])
  },
};
</script>
