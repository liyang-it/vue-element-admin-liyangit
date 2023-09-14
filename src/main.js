import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * 引入 vxe-table支持
 */
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)

/**
 * 本地缓存不使用 LocalStore存储，使用 IndexDB存储, 引入 封装好的 IndexDB操作类库
 * 官网: https://localforage.github.io/localForage/#installation
 */
import localforage from 'localforage'
// 创建一个 IndexDB 数据库
const localDb = localforage.createInstance({
  name: 'localDb'
})

// 把 localforage 和 IndexDB数据库挂载到Vue全局实例中
Vue.prototype.$localforage = localforage

Vue.prototype.$localDb = localDb

console.info('本地IndexDB数据库挂载到Vue实例完成')
console.info('使用 this.$localDb.setItem() 或者 Vue.prototype.$localDb.setItem() 存储内容 ')
console.info('使用 this.$localforage 或者 Vue.prototype.$localforage 操作IndexDB ')

// 引入 基础资料缓存加载
import { init } from '@/dict/initDict'
init()
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
