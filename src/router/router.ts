import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/Layout/index.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location:any) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err:any) => err)
}

Vue.use(VueRouter)
/*
    hidden:true   如果hidden为true,则在左侧菜单栏展示，否则不显示
    name:'router-name' 路由名称，必须填写
    meta{
        title:'title'       对应路由在左侧菜单栏的标题名称
        icon:'icon-class'   对应路由在左侧菜单栏的图标样式，样式使用fontawsome图标库
    }
 */
export const asyncRouterMap= [
    {
        path: '/',
        name: 'DasbBoard',
        component: Layout,
        hidden:true,
        redirect: "/home",
        children: [
            {
                path: "/home",
                name: "Home",
                meta:{title:'首页',icon:'fa fa-home'},
                component: () => import("@/views/Home.vue")
            },

        ]

    },
    {
        path: '/dataManage',
        name: 'DataManage',
        component: Layout,
        hidden:true,
        meta:{title:'数据管理',icon:'fa fa-database'},
        children: [
            {
                path: "/tableData",
                name: "TableData",
                meta:{title:'表格管理',icon:'fa fa-table'},
                component: () => import("@/views/DataManage/TableData.vue")
            },
            {
                path: "/formData",
                name: "FormData",
                meta:{title:'表单管理',icon:'fa fa-file-text-o'},
                component: () => import("@/views/DataManage/FormData.vue")
            },
            {
                path: "/chartsData",
                name: "ChartsData",
                meta:{title:'图表管理',icon:'fa fa-bar-chart'},
                component: () => import("@/views/DataManage/ChartsData.vue")
            },
        ]
    },
    {
        path: '/userManage',
        name: 'UserManage',
        component: Layout,
        hidden:true,
        children: [
            {
                path: "/accountData",
                name: "AccountData",
                meta:{title:'账户管理',icon:'fa fa-user-plus'},
                component: () => import("@/views/UserManage/AccountData.vue")
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: Layout,
        hidden:false,
        children: [
            {
                path: "/userInfo",
                name:"userInfo",
                meta:{title:'个人中心'},
                component: () => import("@/views/UserManage/UserInfo.vue")
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        hidden:false,
        meta:{title:'系统登录'},
        component: () => import("@/views/Login/Login.vue")
    },
    {
        path: '/password',
        name: 'Password',
        hidden:false,
        meta:{title:'找回密码'},
        component: () => import("@/views/Login/Password.vue")
    },
    //跳转404
    {
        path:'/404',
        name:'404',
        hidden:false,
        meta:{title:'404'},

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
