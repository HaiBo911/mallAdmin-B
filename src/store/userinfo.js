import { setUserCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

export default {
  namespaced: true,
  state: {
    user: getUserCookie(),
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
  },
};
