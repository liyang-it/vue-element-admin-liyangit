export default {
  /**
 * param 将要转为URL参数字符串的对象
 * idx ,循环第⼏次，⽤&拼接
 * key URL参数字符串的前缀
 * encode true/false 是否进⾏URL编码,默认为true
 * return URL参数字符串
 * 例如现在有一个url = /api/getUser, 参数对象为 {"name": "t", "ages": 18}, 调用 .urlEncode({"name": "t", "ages": 18},1, "/api/getUser") 返回 /api/getUser?name=t&age=18
 */
  urlEncode: function(param, idx, key, encode) {
    if (param == null) return ''
    var paramStr = ''
    var t = typeof (param)
    if (t == 'string' || t == 'number' || t == 'boolean') {
      var one_is = idx < 3 ? '?' : '&'
      paramStr += one_is + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
    } else {
      for (var i in param) {
        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
        idx++
        paramStr += this.urlEncode(param[i], idx, k, encode)
      }
    }
    return paramStr
  },
  /**
   * 多条件筛选对象数组
   * @param {*} queryObj 筛选条件对象
   * @param {*} list 要筛选的对象数组
   * @returns
   */
  filterData: function(queryObj, list) {
    let arr = list
    Object.keys(queryObj).forEach(key => {
      if (queryObj[key] == undefined || queryObj[key] == '') return arr
      arr = arr.filter(p => p[key] === null ? true : p[key].toLowerCase().includes(queryObj[key].toLowerCase())) // 匹配成功返回
    })
    return arr
  },
  patchZero: function(num, median) {
    var tmp = '000000000000000000'
    median = median || 2
    num = num + ''
    var ns = num.length
    if (ns >= median) {
      return num
    }
    return tmp.substring(0, median - ns) + num
  },
  /**
   * 格式化 Date
   * @param {} date  日期对象
   * @param {*} fmt  格式 默认 yyyy-MM-dd HH:mm:ss
   * @returns
   */
  formatDate(date, fmt) {
    const that = this
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    return fmt.replace('yyyy', date.getFullYear())
      .replace('MM', that.patchZero(date.getMonth() + 1))
      .replace('dd', that.patchZero(date.getDate()))
      .replace('HH', that.patchZero(date.getHours()))
      .replace('mm', that.patchZero(date.getMinutes()))
      .replace('ss', that.patchZero(date.getSeconds()))
      .replace('sss', that.patchZero(date.getMilliseconds()))
  },
  formatTimestamp(ctime, fmt) {
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss'
    var date = new Date()
    date.setTime(parseInt(ctime) * 1000)
    return this.formatDate(date, fmt)
  },
  /**
   * 获取日期 是第几周
   * @param {*} src Date对象
   */
  getWeekNumber(src) {
    const date = new Date(src.getTime())
    date.setHours(0, 0, 0, 0)
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
    // January 4 is always in week 1.
    const week1 = new Date(date.getFullYear(), 0, 4)
    // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
    // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
    // 如果周小于 10 需要补0
    const result = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    return result <= 9 ? '0' + result : result
  }
  // eslint-disable-next-line eol-last
}
