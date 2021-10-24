<template>
  <div class="home-container">
    <left-menu></left-menu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.menu.collapsed }">
      <slider-nav></slider-nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  data() {
    return {};
  },
  components: {
    LeftMenu,
    SliderNav,
  },
  methods: {},
};
</script>

<style scoped lang="less">
// @import "~@/assets/css/home.less";
@import url("~@/assets/css/home.less");
 .main-app {
        margin-left: 180px;
        transition: all 0.2s;
        &.menu-unfold {
            margin-left: 80px;
        }
    }
</style>
