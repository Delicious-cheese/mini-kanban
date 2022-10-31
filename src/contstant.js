import { v4 as uuidv4 } from 'uuid'

export const data = [
    {
        projectName: 'kanban',
        toDo: [
            {
                taskName: '拖拽效果实现',
                taskDetail: '相同列之间的拖拽和不同列之间的拖拽',
                id: uuidv4(),
            },
            {
                taskName: '当前列新加任务',
                taskDetail: '当前列需要新添加任务，修改对应数据',
                id: uuidv4(),
            },
        ],
        inProgress: [
            {
                taskName: '提交完成的步骤',
                taskDetail: 'git管理代码',
                id: uuidv4(),
            },
            {
                taskName: '看板数据',
                taskDetail: '创建数据项',
                id: uuidv4(),
            },

        ],
        done: [
            {
                taskName: '导入项目依赖',
                taskDetail: 'UI组件库和id生成器',
                id: uuidv4(),
            },
            {
                taskName: '看板布局',
                taskDetail: '完成看板看板的主要布局',
                id: uuidv4(),
            },
            {
                taskName: '看板当前项目显示',
                taskDetail: '点击项目，可以将点击的项目切换为当前项目',
                id: uuidv4(),
            },
            {
                taskName: '看板项目数据添加',
                taskDetail: '能够增加删除看板项目数据',
                id: uuidv4(),
            },

        ],
    },
    {
        projectName: 'resposive web',
        toDo: [],
        inProgress: [],
        done: []
    }
]