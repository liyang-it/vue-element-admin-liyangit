// 基础资料
import Vue from 'vue'

/**
 * 在这里可以请求后端把所有的基础资料缓存到本地
 */
export function init() {
  // 测试存储
  Vue.prototype.$localDb.setItem('test_text1', 'hello word')
  Vue.prototype.$localDb.setItem('test_text2', 'hello word')
  Vue.prototype.$localDb.setItem('test_text3', 'hello word')
  Vue.prototype.$localDb.setItem('test_text4', 'hello word')
  Vue.prototype.$localDb.setItem('test_text5', 'hello word')
  Vue.prototype.$localDb.setItem('test_text6', 'hello word')
  Vue.prototype.$localDb.setItem('test_text7', 'hello word')
  console.info('基础资料缓存加载完成')
}

/**
 * 根据 key获取缓存
 * @param {*} key key名称
 * 外部调用方式： let cache = await getCache('test_text')
 */
export function getCache(key) {
  return Vue.prototype.$localDb.getItem(key)
}
