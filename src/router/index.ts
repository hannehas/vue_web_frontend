import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import BratenListeView from "@/views/BratenListeView.vue";
import BratenChatView from "@/views/BratenChatView.vue";

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/liste',
    name: 'BratenListeView',
    component: BratenListeView
  },
  {
    path: '/chat',
    name: 'BratenChatView',
    component: BratenChatView
  },
  {
    path: '/',
    redirect: '/liste'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
