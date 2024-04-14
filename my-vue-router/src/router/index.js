import Vue from 'vue'
import VueRouter from '../myRouter/index.js'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '@/views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [{
      path: 'a',
      component: { render: (h) => <h1>a</h1> }
    }, {
      path: 'b',
      component: { render: (h) => <h1>b</h1> }
    }]
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutViewVue,
    children: [{
      path: 'a',
      component: { render: (h) => <h1>aa</h1> }
    }, {
      path: 'b',
      component: { render: (h) => <h1>bb</h1> }
    }]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((from, to, next) =>
  setTimeout(() => { console.log('1'); next()})
)
router.beforeEach((from, to, next) =>
  setTimeout(() => {console.log('2'); next()}, 1000)
)

router.matcher.addRoute(
  {
    path: '/cc',
    component: HomeView,
    children: [{
      path: 'c',
      component: { render: (h) => <h1>c</h1> }
    }]
  }
)



export default router
