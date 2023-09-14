<!-- 头部菜单组件，适合用于打包为桌面端使用, 例如  Tauri等 -->
<template>
  <div class="head-menu-main">
    <!-- PC端桌面应用环境才显示 -->
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        网页端操作
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="openWebUrl">打开网页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span class="el-dropdown-link" @click="openCopy">
      复制内容
    </span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        页面刷新
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="reloadHome">刷新首页</el-dropdown-item>
        <el-dropdown-item @click.native="reloadThis">刷新当前页面</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-popover
      placement="right"
      width="400"
      trigger="click"
    >
      <el-slider
        v-model="zoomValue"
        show-input
        :min="0.5"
        :max="2"
        :step="0.1"
        @change="zoomValueChange"
      />
      <span slot="reference" class="el-dropdown-link">
        缩放界面
      </span>
    </el-popover>
    <span class="el-dropdown-link">
      当前版本@{{ pcVersion }}
    </span>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // 组件名称
  name: 'HeadMenuIndex',
  // import引入的组件需要注入到对象中才能使用
  components: {},
  // 父组件传递值
  props: {
  },
  data() {
    // 这里存放数据
    return {
      zoomValue: Number.parseFloat(this.$store.state.app.zoom),
      pcVersion: process.env.VUE_APP_PC_VERSION // 当前版本

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 缩放
    document.body.style.zoom = this.zoomValue
  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { },
  // 方法集合
  methods: {
    /**
     * 缩放值改变时间
     * @param {*} value
     */
    zoomValueChange(value) {
      this.$store.dispatch('app/setZoom', value)
      // 缩放
      document.body.style.zoom = value
    },
    // 刷新当前页面
    reloadThis() {
      // 当前页面对象
      const nowView = this.$store.state.tagsView.nowView
      this.$store.dispatch('tagsView/delCachedView', nowView).then(() => {
        const { fullPath } = nowView
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    // 首页刷新
    reloadHome() {
      location.href = '/'
    },
    // 打开网页,
    openWebUrl() {
      window.open('https://github.com/liyang-it/vue-element-admin-liyangit')
    },
    // 打开复制内容消息框
    openCopy() {
      const h = this.$createElement
      const copyText = '我是复制内容'
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', null, '点击复制, 会复制以下内容  '),
          h('i', { style: 'color: teal' }, copyText),
          h('span', null, '....')
        ]),
        showCancelButton: false,
        confirmButtonText: '复制'
      }).then(action => {
        // 复制
        if (navigator.clipboard) {
          // clipboard api 复制
          navigator.clipboard.writeText(copyText)
        } else {
          var textarea = document.createElement('textarea')
          document.body.appendChild(textarea)
          // 隐藏此输入框
          textarea.style.position = 'fixed'
          textarea.style.clip = 'rect(0 0 0 0)'
          textarea.style.top = '10px'
          // 赋值
          textarea.value = copyText
          // 选中
          textarea.select()
          // 复制
          document.execCommand('copy', true)
          // 移除输入框
          document.body.removeChild(textarea)
        }
      })
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
/**scoped 表示样式只在当前组件有效*/
//@import url(); 引入公共css类

.head-menu-main {
    width: 100%;
    height: 23px;
    position: fixed;
    z-index: 1000;
    background: #fff;
    padding: 0px 0px 0px 5px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #4c4949;;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif !important;
    font-weight: 500;
    font-size: 12px;
    margin-right: 10px;
}
</style>
