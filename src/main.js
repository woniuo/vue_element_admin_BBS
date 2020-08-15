// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import ElementUI from "element-ui"
import App from "./App.vue"
import router from "./router"
import store from "./vuex"
import i18n from "./i18n/i18n"
import globalPlugin from "./utils/global"
import permission from "./directive/permission/button"
import NProgress from "nprogress"
import animated from "animate.css"
import $http from "./vuex/store"

import "nprogress/nprogress.css"
import "element-ui/lib/theme-chalk/index.css"
import "./assets/iconfont/iconfont.css"
import "font-awesome/css/font-awesome.css"
import "@/router/permission"
import "babel-polyfill"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(globalPlugin)
Vue.use(permission)
Vue.use(animated)
Vue.prototype.httpUrl = $http.HTTP_URL
Vue.prototype.apiUrl = $http.API_URL
Vue.prototype.testUrl = $http.TEST_API_URL
NProgress.inc(0.2)
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false })

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App),
  components: {App},
  template: "<App/>"
})
