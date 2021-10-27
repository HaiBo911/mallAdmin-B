<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.menu.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{ currentRoute[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="currentRoute[1].name">{{ currentRoute[1].meta.title }}</router-link>
          </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="user-info">
      <li>欢迎{{$store.state.userinfo.user.username}}<a-icon type="down" /></li>
      <li @click="logout">退出</li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched,
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('menu/changeCollapsed');
    },
    logout() {
      this.$store.dispatch('userinfo/logout');
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="less" scoped>
.main-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding-left: 10px;
  padding-right: 20px;
  .breadcrumb {
    display: inline-block;
    margin-left: 20px;
  }
  .user-info {
    float: right;
    text-align: center;
    cursor: pointer;
    li:not(:first-child) {
      display: none;
      &:hover {
        background-color: #eee;
        color: #999;
        font-weight: 700;
      }
    }
    li {
      padding: 0 20px;
    }
    &:hover {
      li {
        display: block;
      }
    }
  }
}
</style>
