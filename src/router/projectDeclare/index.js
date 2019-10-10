export default [
    // 预申报
    {
        path: '/projectDeclare',
        name: 'projectDeclare',
        component: resolve => require(['@/view/projectDeclare/index.vue'], resolve),
        children: [{
                path: '/projectDeclare/declareTheme',
                name: 'declareTheme',
                component: resolve => require(['@/view/projectDeclare/declareTheme.vue'], resolve),
                meta: {
                    headerName: '主题列表'
                }
            },
            // 申报信息
            {
                path: '/projectDeclare/declarationInformation',
                name: 'declarationInformation',
                component: resolve => require(['@/view/projectDeclare/declarationInformation.vue'], resolve),
                meta: {
                    headerName: '申报信息'
                },
            },
            // 项目基本信息（编辑）
            {
                path: '/projectDeclare/projectbasicInfo',
                name: 'projectbasicInfo',
                component: resolve => require(['@/view/projectDeclare/projectbasicInfo.vue'], resolve),
                meta: {
                    headerName: '申报信息'
                },
            },
            // 项目基本信息（查看）
            {
                path: '/projectDeclare/searchbasicInfo',
                name: 'searchbasicInfo',
                component: resolve => require(['@/view/projectDeclare/searchbasicInfo.vue'], resolve),
                meta: {
                    headerName: '申报信息'
                },
            },
            // 研究背景及技术经济分析
            {
                path: '/projectDeclare/researchAnalysis',
                name: 'researchAnalysis',
                component: resolve => require(['@/view/projectDeclare/researchAnalysis.vue'], resolve),
                meta: {
                    headerName: '申报信息'
                },
            }
        ]
    }
]