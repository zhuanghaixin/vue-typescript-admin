import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from  '../views/Layout/index.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
    {
      path: '/login',
      name: 'Login',
      component: ()=>import("@/views/Login/Login.vue")
    },
    {
      path: '/password',
      name: 'Password',
      component: ()=>import("@/views/Login/Password.vue")
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


//路由拦截
router.beforeEach((to:any,from:any,next:any)=>{
  const isLogin=localStorage.tsToken?true:false;
  console.log('to')
  console.log(to)
  console.log('from')
  console.log(from)
  if(to.path=='/login'||to.path=="/password") {
    next();
  }else{
     isLogin?next():next("/login")
    }
})

export default router
