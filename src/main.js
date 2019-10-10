// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import router from './router/preDeclare.js'

// 全局样式
import './assets/css/base.css';
import './assets/css/style.css'
// 引入 Verify
import '../static/verify-master/css/verify.css'
// 引入elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false;
// 引用vuex
import Vuex from 'vuex'
Vue.use(Vuex)
    // 引用layer
import layer from 'vue-layer';
Vue.prototype.$layer = layer(Vue);
// 使用vuex
import store from './store'
// 引入lib-flexible
// import "lib-flexible/flexible.js"
// 导出Excel
import Blob from '@/excel/Blob.js';
import Export2Excel from '@/excel/Export2Excel.js';

import dayjs from "dayjs"
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})