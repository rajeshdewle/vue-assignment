import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    component: () => import(/* webpackChunkName: "home-page" */ '../views/HomePage.vue'),
    children: [
      {
        path: '',
        name: 'products',
        component: () => import(/* webpackChunkName: "product-list" */ '../views/ProductList.vue'),
      },
      {
        path: '/products/add',
        name: 'addProduct',
        component: () => import(/* webpackChunkName: "f" */ '../views/AddProduct.vue'),
      },
      {
        path: '/products/edit/:id',
        name: 'editProduct',
        component: () => import(/* webpackChunkName: "edit-product" */ '../views/EditProduct.vue'),
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
