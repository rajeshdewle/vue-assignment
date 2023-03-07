<template>
  <Form @submit="onSubmit">
    <div class="row mb-3">
      <div class="col">
        <label for="product_name" class="form-label">Product Name</label>
        <Field
          type="text"
          id="product_name"
          name="product_name"
          class="form-control"
          placeholder="Enter product name"
          :rules="isRequired"
        />
        <ErrorMessage class="form-text text-danger" name="product_name" />
      </div>
      <div class="col">
        <label for="product_sku" class="form-label">SKU</label>
        <Field
          name="product_sku"
          type="text"
          id="product_sku"
          class="form-control"
          placeholder="Enter unique product SKU"
          :rules="isRequired"
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
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-light me-3">Reset</button>
      <button class="btn btn-primary">Submit</button>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "ProductForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    onSubmit() {
      console.log('Working');
    },
    isRequired(value) {
      if (!value) {
        return 'This field is required';
      }
      return true;
    },
  },
};
</script>
