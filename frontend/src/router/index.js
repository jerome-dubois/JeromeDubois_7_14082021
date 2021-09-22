import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),    
  },
  {
    path: '/posts/:postId',
    name: 'SelectedPost',
    component: () => import('../views/SelectedPost.vue')
  },
  {
    path: '/account',
    name: 'LoggedAccount',
    component: () => import('../views/LoggedAccount.vue')
  },
  {
    path: '/account/:userId',
    name: 'SelectedUserAccount',
    component: () => import('../views/SelectedUserAccount.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;