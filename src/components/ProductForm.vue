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
          v-model="formData.product_name"
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
          v-model="formData.product_sku"
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
          v-model="formData.product_desc"
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
    <div class="mb-3">
      Items:
      <table class="table table-borderless mx-n1" style="width: 100%;">
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Color</th>
            <th scope="col">Number</th>
            <th scope="col">Price</th>
            <th scope="col" class="align-middle text-center">
              <button
                type="button"
                style="width: 26px; height: 26px"
                class="d-flex align-items-center justify-content-center btn btn-outline-primary p-0 rounded-circle"
                @click="addItem"
              >
                <IconPlus />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in items" :key="i">
            <td class="w-25">
              <Field
                :name="`size-${i}`"
                as="select"
                class="form-select"
                v-model="items[i].size"
                aria-label="Select size"
                :rules="isRequired"
              >
                <option value="1">S</option>
                <option value="2">M</option>
                <option value="3">L</option>
              </Field>
              <ErrorMessage class="form-text text-danger" :name="`size-${i}`" />
            </td>
            <td class="w-25">
              <Field
                as="select"
                :name="`color-${i}`"
                class="form-select"
                v-model="item.color"
                aria-label="Select size"
                :rules="isRequired"
              >
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
              </Field>
              <ErrorMessage class="form-text text-danger" :name="`color-${i}`" />
            </td>
            <td class="w-25">
              <Field
                :name="`part_number-${i}`"
                type="number"
                v-model="item.part_number"
                class="form-control"
                :rules="isRequired"
              />
              <ErrorMessage class="form-text text-danger" :name="`part_number-${i}`" />
            </td>
            <td class="w-25">
              <Field
                :name="`price-${i}`"
                type="number"
                v-model="item.price"
                class="form-control"
                :rules="isRequired"
              />
              <ErrorMessage class="form-text text-danger" :name="`price-${i}`" />
            </td>
            <td class="align-middle">
              <button
                style="width: 26px; height: 26px"
                type="button"
                class="d-flex align-items-center justify-content-center btn btn-outline-danger p-0 rounded-circle"
                @click="removeItem(i)"
                :disabled="items.length === 1"
              >
                <IconTrash />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
import IconPlus from "@/components/icons/IconPlus.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

export default {
  name: "ProductForm",
  components: {
    Form,
    Field,
    DropFile,
    IconPlus,
    IconTrash,
    ErrorMessage,
  },
  data() {
    return {
      formData: {},
      items: [],
      newitem: {
        size: "",
        color: "",
        price: "",
        part_number: "",
      },
    };
  },
  computed: {
    files() {
      return this.$refs.fileinput.files;
    },
  },
  mounted() {
    this.addItem();
  },
  methods: {
    ...mapActions(['getProducts']),
    onSubmit() {
      const images = this.files.map((file) => file.name);
      const payload = {
        ...this.formData,
        items: this.items,
        product_image: images,
      };
      console.log('Working', payload);
      this.reset();
    },
    addItem() {
      this.items.push({...this.newitem});
    },
    removeItem(i) {
      this.items.splice(i, 1);
    },
    reset() {
      this.$refs.productform.resetForm();
      this.$refs.fileinput.reset();
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
