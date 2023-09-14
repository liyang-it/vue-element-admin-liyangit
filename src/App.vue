<template>
  <div id="app">
    <head-menu v-show="topMenu" />
    <router-view />
  </div>
</template>

<script>
const headMenu = () => import('@/components/headMenu/index.vue')
export default {
  name: 'App',
  components: {
    'head-menu': headMenu
  },
  computed: {
    topMenu: {
      get() {
        return this.$store.state.settings.topMenu
      }
    }
  }
}
</script>
