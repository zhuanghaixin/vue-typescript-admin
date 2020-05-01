import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/index.vue'


Vue.use(VueRouter)

export const asyncRouterMap= [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "Home",
                component: () => import("@/views/Home.vue")
            },

        ]

    },
    {
        path: '/dataManage',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: "tableData",
                name: "TableData",
                component: () => import("@/views/DataManage/TableData.vue")
            },
            {
                path: "formData",
                name: "FormData",
                component: () => import("@/views/DataManage/FormData.vue")
            },
            {
                path: "chartsData",
                name: "ChartsData",
                component: () => import("@/views/DataManage/ChartsData.vue")
            },
        ]
    },
    {
        path: '/userManage',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: "accountData",
                name: "AccountData",
                component: () => import("@/views/UserManage/AccountData.vue")
            }
        ]
    },
    {
        path: '/user',
        name: 'Layout',
        component: Layout,

        children: [
            {
                path: "userInfo",
                name:"userInfo",
                component: () => import("@/views/UserManage/UserInfo.vue")
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login/Login.vue")
    },
    {
        path: '/password',
        name: 'Password',
        component: () => import("@/views/Login/Password.vue")
    },
    //跳转404
    {
        path:'/404',
        name:'404',
        component: () => import("@/views/404.vue")
    },
    {
        path:"*",
        redirect:"/404"
    }


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:asyncRouterMap
})


//路由拦截
router.beforeEach((to: any, from: any, next: any) => {
    const isLogin = localStorage.tsToken ? true : false;
    console.log('to')
    console.log(to)
    console.log('from')
    console.log(from)
    if (to.path == '/login' || to.path == "/password") {
        next();
    } else {
        isLogin ? next() : next("/login")
    }
})

export default router
