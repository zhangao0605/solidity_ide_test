import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export const constantRoutes = [
{

  path: '/',
  component: Home,
  redirect: '/home',
  name: 'home',
  hidden: true,
  children: [
    {
      path: '/home',
      component: () => import('../views/homCon/index')
    },
    {
      path: '/allianceManagement',
      nmae: 'allianceManagement',
      component: () => import('../views/allianceManagement/index.vue')
    },
    {
      path: '/blockchainManagement',
      nmae: 'blockchainManagement',
      component: () => import('../views/blockchainManagement/index.vue')
    },
    {
      path: '/blockInfoList',
      nmae: 'blockInfoList',
      component: () => import('../views/blockchainManagement/BlockInfoList.vue')
    },
    {
      path: '/tradeInfoList',
      nmae: 'tradeInfoList',
      component: () => import('../views/blockchainManagement/TradeInfoList.vue')
    },
    {
      path: '/tradeDetail',
      nmae: 'tradeDetail',
      component: () => import('../views/blockchainManagement/TradeDetail.vue')
    },
    {
      path: '/blockDetail',
      nmae: 'blockDetail',
      component: () => import('../views/blockchainManagement/BlockDetail.vue')
    },
    {
      path: '/memberManagement',
      nmae: 'memberManagement',
      component: () => import('../views/memberManagement/index.vue')
    },
    {
      path: '/permissionSettings',
      nmae: 'permissionSettings',
      component: () => import('../views/permissionSettings/index.vue')
    },
    {
      path: '/contractSetting',
      nmae: 'contractSetting',
      component: () => import('../views/contractSetting/index.vue')
    },
    {
      path: '/newContract',
      nmae: 'newContract',
      component: () => import('../views/newContract/index.vue')
    },
    // contractEditor
    {
      path: '/contractEditor',
      nmae: 'contractEditor',
      component: () => import('../views/contractEditor/index.vue')
    },

  ]
},
{
  path: '/login',
  name: 'login',
  component: () => import( /* webpackChunkName: "login" */ '@/views/login')
},
{
  path: '/register',
  name: 'register',
  component: () => import( /* webpackChunkName: "register" */ '@/views/register')
},
{
  path: '/passwordReset',
  name: 'passwordReset',
  component: () => import( /* webpackChunkName: "passwordReset" */ '@/views/passwordReset')
}]

export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router