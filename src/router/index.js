import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/homeView.vue';
import userListView from '../views/userListView.vue';
import userProfileView from '../views/userProfileView.vue';
import loginView from '../views/loginView.vue';
import registerView from '../views/registerView.vue';
import notFoundView from '../views/notFoundView.vue';

const routes = [
  {
    path: '/myspace',
    name: 'home',
    component: homeView
  },
  {
    path: '/myspace/userlist/',
    name: 'userlist',
    component: userListView
  },
  {
    path: '/myspace/userprofile/:userId/',
    name: 'userprofile',
    component: userProfileView
  },
  {
    path: '/myspace/login/',
    name: 'login',
    component: loginView
  },
  {
    path: '/myspace/register/',
    name: 'register',
    component: registerView
  },
  {
    path: '/myspace/404/',
    name: '404',
    component: notFoundView
  },
  {
    path: '/myspace/:catchAll(.*)',
    redirect: '/myspace/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
