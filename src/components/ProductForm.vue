<template>
  <Form @submit="onSubmit" ref="productform">
    <div class="row mb-3">
      <div class="col">
        <label for="product_name" class="form-label">Product Name</label>
        <Field
          type="text"
          id="product_name"
          name="product_name"
          :rules="isRequired"
          class="form-control"
          placeholder="Enter product name"
        />
        <ErrorMessage class="form-text text-danger" name="product_name" />
      </div>
      <div class="col">
        <label for="product_sku" class="form-label">SKU</label>
        <Field
          type="text"
          id="product_sku"
          name="product_sku"
          :rules="isValidSKU"
          class="form-control"
          placeholder="Enter unique product SKU"
        />
        <ErrorMessage class="form-text text-danger" name="product_sku" />
      </div>
    </div>
    <div class="mb-3">
      <label for="product_desc" class="form-label">Desctiption</label>
      <Field v-slot="{ field }" name="product_desc" :rules="isRequired">
        <textarea
          rows="3"
          v-bind="field"
          id="product_desc"
          class="form-control"
          placeholder="Enter product description"
        ></textarea>
      </Field>
      <ErrorMessage class="form-text text-danger" name="product_desc" />
    </div>
    <div class="mb-3">
      <label for="images" class="form-label">Product Images</label>
      <DropFile ref="fileinput"></DropFile>
      <ErrorMessage class="form-text text-danger" name="fileinput" />
    </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-light me-3" @click="reset">Reset</button>
      <button class="btn btn-primary">Submit</button>
    </div>
  </Form>
</template>

<script>
import { mapActions } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import DropFile from "@/components/DropFile.vue";

export default {
  name: "ProductForm",
  components: {
    Form,
    Field,
    DropFile,
    ErrorMessage,
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    ...mapActions(['getProducts']),
    onSubmit() {
      console.log('Working');
    },
    reset() {
      this.$refs.productform.resetForm();
    },
    isRequired(value) {
      if (!value) {
        return 'This field is required';
      }
      return true;
    },
    async isValidSKU(value) {
      if (!value) {
        return 'This field is required';
      }
      if (value) {
        await this.getProducts({ search: `product_sku_like=${value}`, limit: 1 });
        const product = this.$store.state.products.map((p) => p.product_sku == value);
        if (product[0]) {
          return 'SKU must be unique'
        } 
      }
      return true;
    },
  },
};
</script>
