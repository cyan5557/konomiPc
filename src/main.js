import Vue from 'vue'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './static/css/global.css';
import './static/css/swiper.min.css'
Vue.use(ElementUI);
Vue.use(vueAwesomeSwiper);

import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上


Vue.config.productionTip = false

// 全局导航钩子
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.documentElement.scrollTop = 0
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
      // 通过vuex state获取当前的token是否存在
      // console.log(isEmptyObject(store.state.user)) 
      if(!isEmptyObject(store.state.user)) {   
          next();
      }else { 
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
         })
      }
  } else {
      next();
  }
})


function isEmptyObject(obj) {
  for (var key in obj) {
      return false;
  }
  return true;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
