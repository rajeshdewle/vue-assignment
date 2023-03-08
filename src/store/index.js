import { createStore } from "vuex";
import axios from "@/plugins/axios";

const store = createStore({
  state() {
    return {
      products: [],
      setProduct: null,
      pagination: null,
      loading: false,
      alert: {
        show: false,
        msg: '',
        type: 'success',
      },
    };
  },
  mutations: {
    setProducts (state, data) {
      state.products = data;
    },
    setProduct (state, data) {
      state.product = data;
    },
    setPagination (state, data) {
      state.pagination = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
    setAlert(state, data) {
      if(data.show === false) {
        state.alert = {
          show: false,
          msg: '',
          type: 'success',
        };
      } else {
        state.alert = data;
      }
    },
  },
  actions: {
    async getProducts({ commit }, query = { page: 1, search: null, limit: 5 }) {
      commit('setLoading', true);
      const page = query.page ? query.page : 1;
      const limit = query.limit ? query.limit : 5;
      const search = query.search ? query.search : null;
      let url = `/products?_page=${page}&_limit=${limit}`;
      if (search) {
        url = url + `&${search}`;
      }
      await axios
        .get(url)
        .then((res) => {
          commit("setProducts", res.data);
          commit('setPagination', res.headers.link);
        })
        .catch((e) => console.error(e));
      commit('setLoading', false);
    },
    async getProduct({ commit }, id) {
      commit('setLoading', true);
      let url = `/products/${id}`;
      await axios
        .get(url)
        .then((res) => {
          commit("setProduct", res.data);
        })
        .catch((e) => console.error(e));
      commit('setLoading', false);
    },
    async saveProducts({ commit }, payload) {
      commit('setLoading', true);
      await axios
        .post('/products', payload)
        .then((res) => {
          if (res.data.id) {
            const alert = {
              show: true,
              msg: 'Product added successfully!',
              type: 'success',
            };
            commit('setAlert', alert);
          }
        })
        .catch((e) => {
          console.error(e);
          const alert = {
            show: true,
            msg: 'Erorr to add product',
            type: 'danger',
          };
          commit('setAlert', alert);
        });
      commit('setLoading', false);
    },
    async updateProducts({ commit }, payload) {
      commit('setLoading', true);
      await axios
        .put(`/products/${payload.id}`, payload)
        .then((res) => {
          if (res.data.id) {
            const alert = {
              show: true,
              msg: 'Product updated successfully!',
              type: 'success',
            };
            commit('setAlert', alert);
          }
        })
        .catch((e) => {
          console.error(e);
          const alert = {
            show: true,
            msg: 'Erorr to update product',
            type: 'danger',
          };
          commit('setAlert', alert);
        });
      commit('setLoading', false);
    },
    async deleteProduct({ commit, dispatch }, id) {
      commit('setLoading', true);
      await axios
        .delete(`/products/${id}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const alert = {
              show: true,
              msg: 'Product deleted successfully!',
              type: 'success',
            };
            commit('setAlert', alert);
            dispatch('getProducts');
            window.scrollTo(0,0);
          }
        })
        .catch((e) => {
          console.error(e);
          const alert = {
            show: true,
            msg: 'Erorr to delete product',
            type: 'danger',
          };
          commit('setAlert', alert);
        });
      commit('setLoading', false);
    },
  },
  getters: {
    pagination: ( state ) => {
      if (state.pagination) {
        return Object.fromEntries(state.pagination.split( ", " ).map( header => header.split( "; " ) ).map( header => [ header[1].replace( /"/g, "" ).replace( "rel=", "" ), header[0].slice( 1, -1 ) ] ) );
      }
      return { prev: null, next: null };
    }
  },
});

export default store;
