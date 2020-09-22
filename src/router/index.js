import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/dial',
    name: 'dial',
    component: () => import("../views/dial.vue")
  },
  {
    path: '/img',
    name: 'img',
    component: () => import("../views/img.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
