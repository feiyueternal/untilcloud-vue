import Home from '@/views/Home.vue'
import About from '@/views/About'
import Login from '@/views/Login'
import Changecode from '@/views/Changecode'
import Register from '@/views/Register'
import ForgetPassword from '@/views/ForgetPassword'
import Users from '@/views/Users'
import Roles from '@/views/Roles/RolesManageIndex'
import Menus from '@/views/Menus/MenusManageIndex'
import Perms from '../views/Perms/PermsManageIndex'
import Page404 from '@/views/error/Page404'
import Page403 from '@/views/error/Page403'
import Page500 from '@/views/error/Page500'
import Navbar from '@/views/NavBar/index'


// export const router_list = [
//     {
//         path: '/about',
//         name: 'About',
//         // component: () => import('@/views/About.vue')
//         component:About
//     },
//     {
//         path: '/admin',
//         name: 'AdminIndex',
//         // component: () => import('@/views/Home.vue')
//         component:Home
//     }, 
//     {
//         path: '/admin/system/user',
//         name: 'UserManagement',
//         component: () => import('@/views/Users.vue')
//     }, 
//     {
//         path: '/admin/system/role',
//         name: 'RoleManagement',
//         component: () =>import('@/views/Roles/RolesManageIndex.vue')
//     }, 
//     {
//         path: '/admin/system/menu"',
//         name: 'MenuManagement',
//         component: () =>import('@/views/Menus/MenusManageIndex.vue')
//     }, 
//     {
//         path: '/admin/system/perm',
//         name: 'PermManagement',
//         component: () =>import('@/views/Perms/PermsManageIndex.vue')
//     }, 
//     {
//         path: '/admin/error/unauthorized',
//         name: 'Unauthorized',
//         component: () =>import('@/views/error/Page403.vue')
//     }, 
//     {
//         path: '/admin/error/serverError',
//         name: 'ServerError',
//         component: () =>import('@/views/error/Page500.vue')
//     },
//     {
//         path: '/admin/error/notFound',
//         name: 'NotFound',
//         component: () =>import('@/views/error/Page404.vue')
//     },
//     {
//         name:"User",
//         path:"/admin",
//         component: () => import('@/views/Home.vue')
//     },
//     {
//         name:"System",
//         path:"/admin",
//         component: () => import('@/views/Home.vue')
//     },
//     {
//         name:"Error",
//         path:"/admin",
//         component: () => import('@/views/Home.vue')
//     },
//     {
//         name:"DataDictionary",
//         path:"/admin/system/dataDictionary",
//         component: () => import('@/views/Home.vue')
//     }
// ]

// export const router_list = [
//     {
//         path: '/about',
//         name: 'About',
//         // component: () => import('@/views/About.vue')
//         component: About
//     },
//     {
//         path: '/admin',
//         name: 'AdminIndex',
//         // component: () => import('@/views/Home.vue')
//         component: Home
//     },


//     {
//         name: "User",
//         path: "/admin",
//         // component: () => import('@/views/Home.vue'),
//         component: Navbar,
//         children: [
//             {
//                 path: '/admin/system/user',
//                 name: 'UserManagement',
//                 // component: () => import('@/views/Users.vue')
//                 component: Users
//             },

//             {
//                 path: '/admin/system/role',
//                 name: 'RoleManagement',
//                 // component: () =>import('@/views/Roles/RolesManageIndex.vue')
//                 component: Roles
//             }
//         ]
//     },
//     {
//         name: "System",
//         path: "/admin",
//         // component: () => import('@/views/Home.vue'),
//         component: Navbar,
//         children: [
//             {
//                 path: '/admin/system/menu"',
//                 name: 'MenuManagement',
//                 // component: () =>import('@/views/Menus/MenusManageIndex.vue')
//                 component: Menus
//             },
//             {
//                 path: '/admin/system/perm',
//                 name: 'PermManagement',
//                 // component: () =>import('@/views/Perms/PermsManageIndex.vue')
//                 component: Perms
//             },
//             {
//                 name: "DataDictionary",
//                 path: "/admin/system/dataDictionary",
//                 // component: () => import('@/views/Home.vue')
//                 component: Home
//             }
//         ]
//     },
//     {
//         name: "Error",
//         path: "/admin",
//         // component: () => import('@/views/Home.vue'),
//         component: Navbar,
//         children: [
//             {
//                 path: '/admin/error/unauthorized',
//                 name: 'Unauthorized',
//                 // component: () =>import('@/views/error/Page403.vue')
//                 component: Page403
//             },
//             {
//                 path: '/admin/error/serverError',
//                 name: 'ServerError',
//                 // component: () =>import('@/views/error/Page500.vue')
//                 component: Page500
//             },
//             {
//                 path: '/admin/error/notFound',
//                 name: 'NotFound',
//                 // component: () =>import('@/views/error/Page404.vue')
//                 component: Page404
//             },
//         ]
//     },

// ]

const mpalist=
    {
        'NavBar':Navbar,
        'About': () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
        'AdminIndex': () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        'UserManagement': () => import(/* webpackChunkName: "users" */ '@/views/Users.vue'),
        'RoleManagement': () => import(/* webpackChunkName: "roles" */ '@/views/Roles/RolesManageIndex.vue'),
        'MenuManagement': () => import(/* webpackChunkName: "menus" */ '@/views/Menus/MenusManageIndex.vue'),
        'PermManagement': () => import(/* webpackChunkName: "perms" */ '@/views/Perms/PermsManageIndex.vue'),
        'Unauthorized': () => import(/* webpackChunkName: "page403" */ '@/views/error/Page403.vue'),
        'ServerError': () => import(/* webpackChunkName: "page500" */ '@/views/error/Page500.vue'),
        'NotFound': () => import(/* webpackChunkName: "page404" */ '@/views/error/Page404.vue'),
        "DataDictionary": () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        "User": Navbar,
        "System": Navbar,
        "Error":Navbar, 
    }

    export default mpalist;