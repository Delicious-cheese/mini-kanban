import React from 'react';
import { Modal, Input, Form, message } from 'antd';
import './CardModal.css';
import { v4 as uuidv4 } from 'uuid'


const CardModal = ({ isModalOpen, setIsModalOpen, setProjectData, title, currentProject, setCurrentProject, id, setId, projectData }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        const usrTaskName = form.getFieldValue('taskName');
        const usrTaskDetail = form.getFieldValue('taskDetail');
        if (usrTaskName && usrTaskName.trim()) {
            const res = projectData.find(item => item.projectName === currentProject.projectName);
            if (!res) return;
            const isFind1 = res['toDo'].find(item => item.taskName === usrTaskName);
            const isFind2 = res['inProgress'].find(item => item.taskName === usrTaskName);
            const isFind3 = res['done'].find(item => item.taskName === usrTaskName);
            if (isFind1 || isFind2 || isFind3) {
                message.warning('该任务已存在');
                return;
            }
            setProjectData(pre => {
                const newData = [...pre];
                const s = {
                    taskName: usrTaskName,
                    taskDetail: usrTaskDetail,
                    id: uuidv4()
                }
                newData.forEach(item => {
                    if (item.projectName === currentProject.projectName) {
                        // console.log(item[title])
                        item[title].push(s)
                    }
                })
                // 并且修改当前任务数据
                setCurrentProject(pre => ({
                    ...pre,
                    [title]: [
                        ...pre[title],
                        s
                    ]
                }))
                return newData;
            })
            setIsModalOpen(false);
        }
    };

    const handleOK2 = () => {
        const usrTaskName = form.getFieldValue('taskName');
        const usrTaskDetail = form.getFieldValue('taskDetail');
        if (usrTaskName && usrTaskName.trim()) {
            const isFind = projectData.find(item => item.projectName === currentProject.projectName)[title].find(item => item.taskName === usrTaskName)
            if (isFind) {
                message.warning('该任务已存在');
                return;
            }
            setProjectData(pre => {
                const newData = [...pre];
                const s = {
                    taskName: usrTaskName,
                    taskDetail: usrTaskDetail,
                    id
                }
                let index = -1;
                newData.forEach(item => {
                    if (item.projectName === currentProject.projectName) {
                        index = item[title].findIndex(item => item.id === id);
                        item[title].splice(index, 1, s)
                    }
                })

                return newData;
            })
            setIsModalOpen(false);
            setId('')
        }
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <Modal
            title={id ? "修改任务" : "新任务"}
            open={isModalOpen}
            onOk={id ? handleOK2 : handleOk}
            onCancel={handleCancel}
            cancelText="取消"
            okText="确定"
            className='card-modal'
        >
            <p>{id ? "请输入要修改的任务名" : "请输入要添加的任务名"}</p>
            <Form form={form} validateTrigger={['onChange']}>
                <Form.Item
                    name='taskName'
                    rules={[
                        {
                            required: true,
                            message: '请输入任务名称!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                let vValue = getFieldValue('taskName').trim();
                                if (!value || value !== vValue) {
                                    return Promise.reject(new Error('不能为空字符串'));
                                }
                                return Promise.resolve();

                            },
                        }),

                    ]}
                >
                    <Input placeholder='此处不能为空' />
                </Form.Item>
                <Form.Item
                    name='taskDetail'
                >
                    <Input placeholder='此处可以为空' />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default CardModal