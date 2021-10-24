export default {
  namespaced: true,
  state: {
    collapsed: false, // 用于切换菜单栏的闭合状态
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
  },
};
