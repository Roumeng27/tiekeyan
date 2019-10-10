export default [{
        path: '/projectDeclare',
        name: 'projectDeclare',
        component: resolve => require(['@/view/projectDeclare/index.vue'], resolve),
        children: [
            //预申报
            //申报主题
            {
                path: '/preDeclare/declareTheme',
                name: 'declareTheme',
                component: resolve => require(['@/view/projectDeclare/preDeclare/declareTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 创建主题
            {
                path: '/preDeclare/declareTheme/addTheme',
                name: 'addTheme',
                component: resolve => require(['@/view/projectDeclare/preDeclare/addTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 查看主题
            {
                path: '/preDeclare/declareTheme/SeeTheme',
                name: 'SeeTheme',
                component: resolve => require(['@/view/projectDeclare/preDeclare/SeeTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 编辑主题
            {
                path: '/preDeclare/declareTheme/modifyTheme',
                name: 'modifyTheme',
                component: resolve => require(['@/view/projectDeclare/preDeclare/modifyTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 申报信息
            {
                path: '/preDeclare/declarationInformation',
                name: 'declarationInformation',
                component: resolve => require(['@/view/projectDeclare/preDeclare/declarationInformation.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 查看申报信息
            {
                path: '/preDeclare/declarationInformation/searchbasicInfo',
                name: 'searchbasicInfo',
                component: resolve => require(['@/view/projectDeclare/preDeclare/searchbasicInfo.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 新增申报信息
            {
                path: '/preDeclare/declarationInformation/projectbasicInfo',
                name: 'projectbasicInfo',
                component: resolve => require(['@/view/projectDeclare/preDeclare/projectbasicInfo.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 修改申报信息
            {
                path: '/preDeclare/declarationInformation/editbasicInfo',
                name: 'editbasicInfo',
                component: resolve => require(['@/view/projectDeclare/preDeclare/editbasicInfo.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 研究背景及技术经济分析
            {
                path: '/preDeclare/declarationInformation/researchAnalysis',
                name: 'researchAnalysis',
                component: resolve => require(['@/view/projectDeclare/preDeclare/researchAnalysis.vue'], resolve),
                meta: {
                    login: true
                },
                meta: {
                    headerName: '申报信息'
                },
            },
            //申报决策
            {
                path: '/preDeclare/declareDecision',
                name: 'declareDecision',
                component: resolve => require(['@/view/projectDeclare/preDeclare/declareDecision.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 评审会
            {
                path: '/preDeclare/declareDecision/reviewMeeting',
                name: 'reviewMeeting',
                component: resolve => require(['@/view/projectDeclare/preDeclare/reviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 审批详情
            {
                path: '/preDeclare/declareDecision/approvalDetails',
                name: 'approvalDetails',
                component: resolve => require(['@/view/projectDeclare/preDeclare/approvalDetails.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //新建评审会
            {
                path: '/preDeclare/declareDecision/addreviewMeeting',
                name: 'addreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/preDeclare/addreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //查看评审会详情
            {
                path: '/preDeclare/declareDecision/searchreviewMeeting',
                name: 'searchreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/preDeclare/searchreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //修改评审会详情
            {
                path: '/preDeclare/declareDecision/editreviewMeeting',
                name: 'editreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/preDeclare/editreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            }

        ]
    }

]