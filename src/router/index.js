import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js';
import { Message, Loading } from 'element-ui';
import { accountPersonnelhasLogin } from '../http/impl/home'

// ...mapGetters({
//     loginInforma:'gs_Home_loginInforma',
//   })
Vue.use(Router)
import preDeclare from './projectDeclare/preDeclare'; // 预申报
import declaration from './declaration/index'; // 申报
import declareContract from './declareContract/index'; // 合同申报
import templateManage from './templateManage/index'; //系统管理
import workbench from './workbench/index'; //我的工作台
const router = new Router({
    routes: [
        ...preDeclare,
        ...declaration,
        ...declareContract,
        ...templateManage,
        ...workbench,
        {
            path: '/',
            name: 'home',
            component: resolve => require(['@/view/home/index.vue'], resolve)
        },

        // 测试
        {
            path: '/test',
            name: 'test',
            component: resolve => require(['@/view/test.vue'], resolve)
        },
        // 测试s
        // {
        //     path: '/tests',
        //     name: 'tests',
        //     component: resolve => require(['@/view/tests.vue'], resolve)
        // },
        // 未开发页面
        // 项目管理
        {
            path: '/projectManage',
            name: 'projectManage',
            component: resolve => require(['@/view/projectManage/index.vue'], resolve),
            children: [

                {
                    path: '/projectManage/projectManagement',
                    name: 'projectManagement',
                    component: resolve => require(['@/view/projectManage/projectManagement.vue'], resolve),
                },
            ]
        },
        // 项目归档
        {
            path: '/projectTotal',
            name: 'projectTotal',
            component: resolve => require(['@/view/projectTotal/index.vue'], resolve),
            children: [{
                    path: '/projectTotal/projectPigeonhole',
                    name: 'projectPigeonhole',
                    component: resolve => require(['@/view/projectTotal/projectPigeonhole.vue'], resolve),
                }

            ]
        },
        // 成果报告
        {
            path: '/resultInfo',
            name: 'resultInfo',
            component: resolve => require(['@/view/resultInfo/index.vue'], resolve),
            children: [{
                path: '/resultInfo/resultsReport',
                name: 'resultsReport',
                component: resolve => require(['@/view/resultInfo/resultsReport.vue'], resolve),
            }]
        },
        // 知识管理
        {
            path: '/knowledgeInfo',
            name: 'knowledgeInfo',
            component: resolve => require(['@/view/knowledgeInfo/index.vue'], resolve),
            children: [{
                path: '/knowledgeInfo/knowledgeManagement',
                name: 'knowledgeManagement',
                component: resolve => require(['@/view/knowledgeInfo/knowledgeManagement.vue'], resolve),
            }]
        },
        // 科研资源
        {
            path: '/scientificInfo',
            name: 'scientificInfo',
            component: resolve => require(['@/view/scientificInfo/index.vue'], resolve),
            children: [{
                    path: '/scientificInfo/scientificResource',
                    name: 'scientificResource',
                    component: resolve => require(['@/view/scientificInfo/scientificResource.vue'], resolve),
                },

            ]
        },
        // 我的工作台
        // {
        //     path: '/Workbench',
        //     name: 'Workbench',
        //     component: resolve => require(['@/view/Workbench/index.vue'], resolve),
        //     children: [{
        //             path: '/',
        //             name: 'Workbenchindex',
        //             component: resolve => require(['@/view/Workbench/Workbench.vue'], resolve),
        //         },

        //     ]
        // },
    ]
})



router.beforeEach((to, from, next) => {
    // console.log(store.state.book.loginInforma.name)
    if (to.meta.login) {
        if (store.state.book.loginInforma.name) {
            return next()
        } else {
            // console.log(1)
            accountPersonnelhasLogin().then(res => {
                if (res.result == 'SUCCESS') {
                    store.dispatch('changeLoginInforma', res.data);
                    return next()
                } else {
                    // Message.error('当前未登录');
                    return next({ path: '/' })
                }
            }, err => {
                return next({ path: '/' })
            })


        }
    } else {
        next()
    }
})


export default router;