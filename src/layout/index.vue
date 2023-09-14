<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" :style="{'top' : topMenu === true ? '24px' : '0px'}" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <!--  开启和关闭 顶部菜单栏样式 会导致 Header 标签组件 top元素不准确，特意写一个 样式 兼容 -->
      <div :class="fixedHeaderClass">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    topMenu: {
      get() {
        return this.$store.state.settings.topMenu
      }
    },
    /**
     * 开启和关闭 顶部菜单栏样式 会导致 Header 标签组件 top元素不准确，特意写一个 样式 兼容
     * 主要内容组件页面请参考: src\layout\components\AppMain.vue
     */
    fixedHeaderClass: {
      get() {
        if (this.$store.state.settings.topMenu && !this.$store.state.settings.fixedHeader) {
          // 当 顶部菜单开启、并且 头部固定 关闭 的时候
          return 'not-fixed-header'
        } else if (this.$store.state.settings.topMenu && this.$store.state.settings.fixedHeader) {
          // 当 顶部菜单开启、并且 头部固定 开启 的时候
          return 'fixed-header'
        } else if (!this.$store.state.settings.topMenu && !this.$store.state.settings.fixedHeader) {
          // 当 顶部菜单关闭、并且 头部固定 关闭 的时候
          return ''
        } else if (!this.$store.state.settings.topMenu && this.$store.state.settings.fixedHeader) {
          // 当 顶部菜单关闭、并且 头部固定 开启 的时候
          return 'fixed-header2'
        } else {
          // 顶部菜单关闭的时候
          return 'not-fixed-header'
        }
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  /**
  * 固定 Header 使用的样式类
  */
  .fixed-header {
    position: fixed;
    /** top元素为了兼容 顶部菜单 */
    top: 14px;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  /**
  * 不固定 Header 使用的样式类
  */
  .not-fixed-header {
    position: inherit;
    top: 14px;
    right: 0;
    z-index: 9;
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
  }
  /**
  * 开启固定header 并且关闭 顶部菜单
  */
  .fixed-header2 {
    position: fixed;
    top: 0px;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
