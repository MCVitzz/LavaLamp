import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    meta: { sidebar: false },
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/dashboard',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue')
  },
  {
    path: '/teams',
    name: 'teams',
    component: () => import('../views/Teams.vue')
  },
  {
    path: '/testingGrid',
    name: 'TestingGrid',
    component: () => import('../views/TestingGrid.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { sidebar: false },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { sidebar: false },
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
