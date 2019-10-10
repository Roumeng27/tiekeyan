export default [
    // 系统管理
    {
        path: '/system',
        name: 'system',
        component: resolve => require(['@/view/system/index.vue'], resolve),
        children: [
            // {
            //     path: '/',
            //     name: 'systemindex',
            //     component: resolve => require(['@/view/system/system.vue'], resolve),
            // },
            {
                path: '/', //组织机构管理
                name: 'organizeManage',
                component: resolve => require(['@/view/system/organizeManage.vue'], resolve),
            },
            {
                path: '/system/addUnit', //组织机构管理--添加单位
                name: 'addUnit',
                component: resolve => require(['@/view/system/addUnit.vue'], resolve),
            },
            {
                path: '/system/templateManage', //模板管理
                name: 'templateManage',
                component: resolve => require(['@/view/system/templateManage.vue'], resolve),
            },
            {
                path: '/system/divisionManage', //部门管理
                name: 'divisionManage',
                component: resolve => require(['@/view/system/divisionManage.vue'], resolve),
            },
            {
                path: '/system/userManage', //用户管理
                name: 'userManage',
                component: resolve => require(['@/view/system/userManage.vue'], resolve),
            },
            {
                path: '/system/userManageDetail', //用户管理详情
                name: 'userManageDetail',
                component: resolve => require(['@/view/system/userManageDetail.vue'], resolve),
            },
            {
                path: '/system/manageChapter', //管理章节
                name: 'manageChapter',
                component: resolve => require(['@/view/system/manageChapter.vue'], resolve),
            },
            {
                path: '/system/roleManage', //角色管理
                name: 'roleManage',
                component: resolve => require(['@/view/system/roleManage.vue'], resolve),
            },
            {
                path: '/system/permissionSettings', //角色管理--权限设置
                name: 'permissionSettings',
                component: resolve => require(['@/view/system/permissionSettings.vue'], resolve),
            },
        ]
    }
]