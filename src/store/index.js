import Vue from 'vue'
import Vuex from 'vuex'


import book from './modules/home'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        book
    },
    strict: true
})