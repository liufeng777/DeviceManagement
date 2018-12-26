import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      meta: { requiresAuth: false },
      component: resolve => require(['../views/Login.vue'], m => resolve(m.default))
    },
    {
      path: '/home',
      meta: { requiresAuth: true },
      component: resolve => require(['../views/Home.vue'], m => resolve(m.default)),
      children: [
        {
          path: '/admin',
          meta: { requiresAuth: true },
          component: resolve => require(['../views/admin/Admin.vue'], m => resolve(m.default)),
          children: [
            {
              path: '/',
              meta: { requiresAuth: true },
              component: resolve => require(['../views/admin/UserList.vue'], m => resolve(m.default))
            },
            {
              path: '/admin-device',
              meta: { requiresAuth: true },
              component: resolve => require(['../views/admin/AdminDevice.vue'], m => resolve(m.default))
            },
            {
              path: '/device-map',
              meta: { requiresAuth: true },
              component: resolve => require(['../views/admin/DeviceMap.vue'], m => resolve(m.default))
            }
          ]
        },
        {
          path: '/device-list/:uid/:devId',
          meta: { requiresAuth: true },
          component: resolve => require(['../views/user/DeviceList.vue'], m => resolve(m.default))
        }
      ]
    },
    {
      path: '/',
      redirect: '/admin'
    }
  ]
})

// 验证登录信息
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
