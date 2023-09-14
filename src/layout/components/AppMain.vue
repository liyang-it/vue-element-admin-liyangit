<template>
  <!-- style样式为了兼容 同时开启 顶部菜单和固定head头 产生的样式问题 --->
  <section class="app-main" :style="paddingTop">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
    paddingTop() {
      // 兼容 开启顶部菜单和开启固定head造成的样式问题, 顶部head组件页面请参考: src\layout\index.vue
      if (this.$store.state.settings.topMenu && this.$store.state.settings.fixedHeader) {
        // 当 同时开启 顶部菜单和固定head, 主要内容 往下偏移避免被遮挡
        return { 'padding-top': '100px' }
      } else if (!this.$store.state.settings.topMenu && this.$store.state.settings.fixedHeader) {
        // 当 关闭顶部菜单，开启 固定head, 主要内容 往下偏移避免被遮挡
        return { 'padding-top': '60px' }
      } else if (this.$store.state.settings.topMenu && !this.$store.state.settings.fixedHeader) {
        // 当 开启顶部菜单，关闭 固定head, 主要内容 往下偏移避免被遮挡
        return { 'padding-top': '20px' }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
