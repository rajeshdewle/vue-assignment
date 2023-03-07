import { createStore } from "vuex";
import axios from "@/plugins/axios";

const store = createStore({
  state() {
    return {
      products: [],
    };
  },
  mutations: {
    setProducts (state, data) {
      state.products = data;
    },
  },
  actions: {
    getProducts: async ({ commit }) => {
      let url = `/products`;
      await axios
        .get(url)
        .then((res) => {
          commit("setProducts", res.data);
        })
        .catch((e) => console.error(e));
    },
  },
});

export default store;
