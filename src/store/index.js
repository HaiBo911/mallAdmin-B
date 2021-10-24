import Vue from 'vue';
import Vuex from 'vuex';
import menu from './menu';
import userinfo from './userinfo';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    menu,
    userinfo,
  },
});
