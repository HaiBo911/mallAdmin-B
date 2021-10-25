import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';

Vue.use(VueRouter);

const acyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      hidden: false,
      icon: 'inbox',
    },
    component: Home,
    children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        hidden: false,
        icon: 'unordered-list',
      },
      component: () => import(/* webpackChunkName: "productlist" */ '../views/page/productList.vue'),
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        hidden: false,
        icon: 'file-add',
      },
      component: () => import(/* webpackChunkName: "productadd" */ '../views/page/productAdd.vue'),
    },
    {
      path: 'category',
      name: 'Category',
      meta: {
        title: '商品类目',
        hidden: false,
        icon: 'project',
      },
      component: () => import(/* webpackChunkName: "category" */ '../views/page/category.vue'),
    }],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'number',
      },
      component: () => import(/* webpackChunkName: "index" */ '../views/page/index.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '注册',
      hidden: true,
    },
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

let isAddRouter = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.userinfo.user.appkey && store.state.userinfo.user.username) {
      if (!isAddRouter) {
        const menuRoutes = getMenuRoutes(store.state.userinfo.user.role, acyncRouterMap);
        store.dispatch('userinfo/changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          next();
          router.addRoutes(menuRoutes);
        });
        isAddRouter = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
