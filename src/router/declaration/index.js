export default [
    // 申报
    {
        path: '/declaration',
        name: 'projectDeclare',
        component: resolve => require(['@/view/projectDeclare/index.vue'], resolve),
        children: [
            // 正式申报主题列表
            {
                path: '/preDeclare/formalDeclaration',
                name: 'createDeclaration',
                component: resolve => require(['@/view/projectDeclare/declaration/formalDeclaration.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 新增主题
            {
                path: '/preDeclare/formalDeclaration/addDeclareTheme',
                name: 'addDeclareTheme',
                component: resolve => require(['@/view/projectDeclare/declaration/addDeclareTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 查看主题
            {
                path: '/preDeclare/formalDeclaration/searchDeclareTheme',
                name: 'searchDeclareTheme',
                component: resolve => require(['@/view/projectDeclare/declaration/searchDeclareTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 修改主题
            {
                path: '/preDeclare/formalDeclaration/editDeclareTheme',
                name: 'editDeclareTheme',
                component: resolve => require(['@/view/projectDeclare/declaration/editDeclareTheme.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 查看申报
            {
                path: '/preDeclare/formalDeclaration/checkDeclaration',
                name: 'checkDeclaration',
                component: resolve => require(['@/view/projectDeclare/declaration/checkDeclaration.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 申报决策
            {
                path: '/preDeclare/formalDeclaration/reportDecision',
                name: 'reportDecision',
                component: resolve => require(['@/view/projectDeclare/declaration/reportDecision.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 评审会
            {
                path: '/preDeclare/formalDeclaration/reviewMeeting',
                name: 'reviewMeeting',
                component: resolve => require(['@/view/projectDeclare/declaration/reviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //新建评审会
            {
                path: '/preDeclare/formalDeclaration/addreviewMeeting',
                name: 'addreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/declaration/addreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //查看评审会详情
            {
                path: '/preDeclare/formalDeclaration/searchreviewMeeting',
                name: 'searchreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/declaration/searchreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //修改评审会详情
            {
                path: '/preDeclare/formalDeclaration/editreviewMeeting',
                name: 'editreviewMeeting',
                component: resolve => require(['@/view/projectDeclare/declaration/editreviewMeeting.vue'], resolve),
                meta: {
                    login: true
                },
            },
            // 创建申报
            {
                path: '/formalDeclaration/createDeclaration/projectInformation',
                name: 'createDeclaration',
                component: resolve => require(['@/view/projectDeclare/declaration/component/createDeclareIndex.vue'], resolve),

                children: [
                    // 项目信息-基本信息
                    {
                        // path: '/formalDeclaration/createDeclaration/basicInformation',
                        path: '/',
                        name: 'basicInformation',
                        component: resolve => require(['@/view/projectDeclare/declaration/createDeclaration.vue'], resolve),
                        meta: {
                            login: true,
                            index: 0
                        },
                    },
                    // 项目信息-项目成员
                    {
                        path: '/formalDeclaration/createDeclaration/projectInformation/projectMembers',
                        name: 'projectMember',
                        component: resolve => require(['@/view/projectDeclare/declaration/projectMember.vue'], resolve),
                        meta: {
                            login: true,
                            index: 0
                        },
                    },
                    // 项目信息-单位信息
                    {
                        path: '/formalDeclaration/createDeclaration/projectInformation/unitInformation',
                        name: 'unitInformation',
                        component: resolve => require(['@/view/projectDeclare/declaration/unitInformation.vue'], resolve),
                        meta: {
                            login: true,
                            index: 0
                        },
                    },
                    // 项目信息-课题分解
                    {
                        path: '/formalDeclaration/createDeclaration/projectInformation/taskDecomposition',
                        name: 'taskDecomposition',
                        component: resolve => require(['@/view/projectDeclare/declaration/taskDecomposition.vue'], resolve),
                        meta: {
                            login: true,
                            index: 0
                        },
                    },
                    // 任务
                    {
                        path: '/formalDeclaration/createDeclaration/task',
                        name: 'task',
                        component: resolve => require(['@/view/projectDeclare/declaration/task.vue'], resolve),
                        meta: {
                            login: true,
                            index: 3
                        },
                    },
                    // 文档
                    {
                        path: '/formalDeclaration/createDeclaration/document',
                        name: 'document',
                        component: resolve => require(['@/view/projectDeclare/declaration/document.vue'], resolve),
                        meta: {
                            login: true,
                            index: 1
                        },
                    },
                    // 文档
                    {
                        path: '/formalDeclaration/createDeclaration/accessory',
                        name: 'accessory',
                        component: resolve => require(['@/view/projectDeclare/declaration/accessory.vue'], resolve),
                        meta: {
                            login: true,
                            index: 1
                        },
                    }
                ]
            },
            // 查看申报
            {
                path: '/formalDeclaration/examineDeclaration/projectInformation',
                name: 'examineDeclaration',
                component: resolve => require(['@/view/projectDeclare/declaration/component/examineDeclareIndex.vue'], resolve),
                children: [
                    // 项目信息-基本信息
                    {
                        // path: '/formalDeclaration/examineDeclaration/lookUpInformation',
                        path: '/',
                        name: 'lookUpInformation',
                        component: resolve => require(['@/view/projectDeclare/declaration/examineDeclaration.vue'], resolve),
                        meta: {
                            login: true
                        },
                    },
                    // 项目信息-单位信息
                    {
                        path: '/formalDeclaration/examineDeclaration/projectInformation/companyInformation',
                        name: 'companyInformation',
                        component: resolve => require(['@/view/projectDeclare/declaration/companyInformation.vue'], resolve),
                        meta: {
                            login: true
                        },
                    },
                    // 项目信息-项目成员
                    {
                        path: '/formalDeclaration/examineDeclaration/projectInformation/teamMembers',
                        name: 'teamMembers',
                        component: resolve => require(['@/view/projectDeclare/declaration/teamMembers.vue'], resolve),
                        meta: {
                            login: true
                        },
                    },
                    // 项目信息-课题分解
                    {
                        path: '/formalDeclaration/examineDeclaration/projectInformation/subjectResolve',
                        name: 'subjectResolve',
                        component: resolve => require(['@/view/projectDeclare/declaration/subjectResolve.vue'], resolve),
                        meta: {
                            login: true
                        },
                    },
                ]
            },
            // 任务
            // 新增任务
            {
                path: '/preDeclare/formalDeclaration/addTask',
                name: 'addTask',
                component: resolve => require(['@/view/projectDeclare/declaration/addTask.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //查看详情任务
            {
                path: '/preDeclare/formalDeclaration/detailTask',
                name: 'detailTask',
                component: resolve => require(['@/view/projectDeclare/declaration/detailTask.vue'], resolve),
                meta: {
                    login: true
                },
            },
            //修改任务状态
            {
                path: '/preDeclare/formalDeclaration/modifyTaskState',
                name: 'modifyTaskState',
                component: resolve => require(['@/view/projectDeclare/declaration/modifyTaskState.vue'], resolve),
                meta: {
                    login: true
                },
            },
        ]
    }
]