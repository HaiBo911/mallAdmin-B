import { setUserCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

export default {
  namespaced: true,
  state: {
    // 用户信息
    user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: [],
  },
  mutations: {
    changeUserInfo(state, userinfo) {
      state.user = userinfo;
    },
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  actions: {
    changeUserInfo({ commit }, userinfo) {
      commit('changeUserInfo', userinfo);
      setUserCookie(userinfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({ commit }, routes) {
      commit('changeMenuRoutes', routes);
    },
  },
};
