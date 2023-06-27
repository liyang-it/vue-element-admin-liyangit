import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import { menu } from '@/data/test-menu'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 接 user.js 登陆成功后，第二步 设置动态菜单
    // 这里是 登录成功后，生成 菜单路由的地方

      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      // 上面代码不用动
      // 2、这里可以由后端返回一个额外字段，用于判断当前用户是否为超级管理员，如果是则拥有所有权限, accessedRoutes 存放的就是 所有菜单不用动
      const isSuperAdmin = true
      let userRoutes = []
      if (isSuperAdmin) {
        // 是超级管理员, 直接赋值全部菜单
        userRoutes = accessedRoutes
        console.info('超级管理员')
      } else {
        // 不是超级管理员, 处理后端返回的菜单JSON
        userRoutes = filterAsyncRouter(menu)
        console.info('非超级管理员')
      }

      commit('SET_ROUTES', userRoutes)
      resolve(userRoutes)
    })
  }
}
/**
 * 将 用户菜单JSON信息 转换为 router 可识别的路由json信息
 * @param t 管理员菜单JSON数组, JSON格式请参考 /data/test-menu.js
 * @returns {*}
 */
function filterAsyncRouter(t) {
  t.filter(index => {
    // 使用 alwaysShow 判断， true为 目录， false 为菜单
    if (index.alwaysShow) {
      index.component = Layout
    } else {
      // 不是路由菜单，转换对应 vue组件
      // @/views/sn-manage/dict/indexD
      const component = index.component
      // console.info('动态转换路由', component)
      /**
       * 截取 示例 @/views/sn-manage/dict/index 截取出 @/viesw/ 以外的字符，因为 拼接会异常
       * 新逻辑： 创建页面的时候去掉 @/viesw/
       * @type {*|string}
       * let test = component.substr(find(component, '/', 1) + 1)
       * index.component = require(`@/views/${component}.vue`).default
       */
      index.component = require(`@/views/${component}.vue`).default
    }
    // 递归子菜单
    if (index.children && index.children.length) {
      index.children = filterAsyncRouter(index.children)
    }
    return true
  })
  return t
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
