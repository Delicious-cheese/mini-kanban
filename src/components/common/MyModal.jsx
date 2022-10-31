import React from 'react';
import { Modal, Input, Form } from 'antd';
import './MyModal.css'

const MyModal = ({ isModalOpen, handleCancel, handleOk, form, pName }) => {

    return (
        <Modal
            title={pName ? "修改项目" : "新建项目"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="取消"
            okText="确定"
        >
            <p>{pName ? '请【修改】项目名' : '请【输入】项目名'}</p>
            <Form form={form} validateTrigger={['onChange']}>
                <Form.Item
                    name='projectName'
                    rules={[
                        {
                            required: true,
                            message: '请输入项目名称!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                let vValue = getFieldValue('projectName').trim();
                                if (!value || value !== vValue) {
                                    return Promise.reject(new Error('不能为空字符串'));
                                }
                                return Promise.resolve();

                            },
                        }),

                    ]}
                >
                    <Input placeholder='项目名不能省略' />
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default MyModal