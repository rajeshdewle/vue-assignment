<template>
  <div
    @drop="drop"
    @dragleave="dragleave"
    class="border rounded-2 position-relative p-5"
    @dragover="dragover"
    :class="isDragging ? 'border-primary' : ''"
  >
  <Field @change="onChange" name="fileinput" v-slot="{ handleChange }" :rules="isRequired">
    <input
      multiple
      ref="file"
      type="file"
      id="images"
      name="fileinput"
      accept=".jpg,.jpeg,.png"
      @change="handleChange(onChange());"
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
            type="button"
            style="width: 26px; height: 26px"
            @click="remove(files.indexOf(file))"
            class="d-flex align-items-center justify-content-center btn btn-outline-danger p-0 rounded-circle"
          >
            <IconTrash />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field } from 'vee-validate';
import IconTrash from "./icons/IconTrash.vue";

export default {
  components: {
    Field,
    IconTrash,
  },
  data() {
    return {
      files: [],
      isDragging: false,
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
