<template>
  <div class="menu-list">
    <a-menu
      :default-selected-keys="[$router.currentRoute.matched[1] ?
      $router.currentRoute.matched[1].name : '']"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.menu.collapsed"
    >
    <template v-for="route in this.$store.state.userinfo.menuRoutes">
      <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
        <span slot="title"><a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item v-for="child in route.children" :key="child.name">
          <router-link :to="{name: child.name}">
            <a-icon :type="child.meta.icon" />{{ child.meta.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </template>

    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.menu-list {
        width: 180px;
        height: 100%;
        position: fixed;
        .ant-menu {
            height: 100%;
        }
    }
</style>
