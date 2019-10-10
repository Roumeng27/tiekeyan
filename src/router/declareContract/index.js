export default [
    // 预申报
    {
        path: '/declareContract',
        name: 'declareContract',
        component: resolve => require(['@/view/projectDeclare/index.vue'], resolve),
        children: [
            //申报主题
            {
                path: '/declareContract/pageInfo',
                name: 'pageInfo',
                component: resolve => require(['@/view/projectDeclare/declareContract/pageInfo.vue'], resolve),
            },
        ]
    }
]