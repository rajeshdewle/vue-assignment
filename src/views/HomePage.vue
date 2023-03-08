<template>
  <div class="container">
    <div
      class="alert alert-success d-flex justify-content-between"
      role="alert"
      v-if="showAlert"
    >
      Product
      <button
        type="button" class="btn-close"
        aria-label="Close"
        @click="closeAlert"
      >
      </button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: "HomePage",
  data() {
    return {};
  },
  computed: {
    ...mapState(['alert']),
    showAlert: {
      get() {
        return this.alert.show;
      },
      set(val) {
        return this.setAlert(val);
      },
    },
  },
  methods: {
    ...mapMutations(['setAlert']),
    closeAlert() {
      this.showAlert = false;
    },
  },
};
</script>
