import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'lists',
        component: () => import('src/pages/ListsPage.vue'),
        name: 'lists',
      },
      {
        path: '/listDetail',
        component: () => import('src/pages/ListsDetail.vue'),
        name: 'listsDetail',
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
