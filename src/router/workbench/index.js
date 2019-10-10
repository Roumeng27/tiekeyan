export default [
  // 我的工作台
  {
    path: '/workbench',
    name: 'workbench',
    component: resolve => require(['@/view/workbench/index.vue'], resolve),
    children: [
      // 我的任务
      {
        path: '/',
        name: 'mytask',
        component: resolve => require(['@/view/workbench/task.vue'], resolve),
        meta: {
          // login: true
        },
      },
      //任务详情
      {
        path: '/workbench/taskDetail',
        name: 'taskDetail',
        component: resolve => require(['@/view/workbench/taskDetail.vue'], resolve),
        meta: {
          // login: true
        },
      },
      //我的申报
      {
        path: '/workbench/declare',
        name: 'mydeclare',
        component: resolve => require(['@/view/workbench/declare.vue'], resolve),
        meta: {
          // login: true
        },
      },
    ]
  }
]