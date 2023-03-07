<template>
  <form>
    <div class="row mb-3">
      <div class="col">
        <label for="product_name" class="form-label">Product Name</label>
        <input
          type="text"
          id="product_name"
          class="form-control"
          placeholder="Enter product name"
        >
      </div>
      <div class="col">
        <label for="product_sku" class="form-label">SKU</label>
        <input
          type="text"
          id="product_sku"
          class="form-control"
          placeholder="Enter unique product SKU"
        >
      </div>
    </div>
    <div class="mb-3">
      <label for="product_desc" class="form-label">Desctiption</label>
      <textarea
        rows="3"
        id="product_desc"
        class="form-control"
        placeholder="Enter product description"
      ></textarea>
    </div>
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-light me-3">Reset</button>
      <button class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProductHeader",
};
</script>
