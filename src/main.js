// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import $ from 'jquery'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import '../static/css/normalize.less'
import utils from '../static/js/utils'
import { post, get, patch, put } from "../static/js/http";

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$utils = utils;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
