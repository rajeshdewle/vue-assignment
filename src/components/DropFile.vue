<template>
  <div
    class="border rounded-2 position-relative p-5"
    :class="isDragging ? 'border-primary' : ''"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
  <Field @change="onChange" name="fileinput" v-slot="{ handleChange }" :rules="isRequired">
    <input
      multiple
      ref="file"
      type="file"
      name="fileinput"
      id="images"
      @change="handleChange(onChange());"
      accept=".jpg,.jpeg,.png"
      class="hidden-input position-absolute top-0 bottom-0 start-0 end-0 overflow-hidden opacity-0"
    />
    </Field>

    <div v-if="isDragging">Release to drop files here.</div>
    <div v-else>Drag & drop or select image</div>

    <div class="d-flex mt-4 position-relative" v-if="files.length">
      <div
        v-for="file in files"
        :key="file.name"
        class="me-2 d-flex border rounded-1 p-2"
      >
        <div>
          <img class="preview-img" :src="generateThumbnail(file)" />
          <p :title="file.name">
            {{ makeName(file.name) }}
          </p>
        </div>
        <div>
          <button
            style="width: 26px; height: 26px"
            type="button"
            class="d-flex align-items-center justify-content-center btn btn-outline-danger p-0 rounded-circle"
            @click="remove(files.indexOf(file))"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconTrash from "./icons/IconTrash.vue";
import { Field } from 'vee-validate';

export default {
  components: {
    IconTrash,
    Field,
  },
  data() {
    return {
      isDragging: false,
      files: [],
      error: null,
    };
  },
  methods: {
    onChange() {
      this.files = [...this.$refs.file.files];
    },
    generateThumbnail(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
    },
    makeName(name) {
      return (
        name.split(".")[0].substring(0, 3) +
        "..." +
        name.split(".")[name.split(".").length - 1]
      );
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    isRequired() {
      if (!this.files.length > 0) {
        return `This field is required`;
      }
      return true;
    },
  },
};
</script>

<style>
.preview-img {
  width: 50px;
  height: 50px;
}
</style>
