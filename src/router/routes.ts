import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '/',
        name: 'logindefault',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },
      {
        path: 'email-confirmation',
        name: 'email-confirmation',
        component: () => import('pages/EmailConfirmation.vue'),
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('pages/MePage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/email-sender',
        name: 'email-sender',
        component: () => import('pages/IndexPage.vue'),
      },
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
