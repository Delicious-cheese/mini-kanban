import React, { useState } from 'react';
import './Side.css';
import MyModal from '../common/MyModal';
import { Form, message, Popconfirm } from 'antd';
const removeIcon = require('../../assets/remove-icon.png');
const addIcon = require('../../assets/add-icon2.png');
const editIcon = require('../../assets/edit-icon.png');

const Side = ({ projectData, setProjectData, currentProject, setCurrentProject }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [pName, setPName] = useState('')

    const handleAdd = () => {
        setIsModalOpen(true);
    }

    const confirm = () => {
        if (projectData.length === 0)
            message.warning('当前已无任务需要删除');

        if (currentProject?.projectName) {
            setProjectData((pre) => {
                let newData;
                newData = pre.filter(item => item.projectName !== currentProject.projectName);
                if (newData.length > 0) {
                    setCurrentProject(newData[0])
                }
                return newData;
            })
            message.success('删除成功');
        }
    };

    // 切换当前项目
    const handleClick = (item) => {
        setCurrentProject(item)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        const validData = form.getFieldValue();
        if (validData?.projectName && validData?.projectName?.trim().length > 0) {
            //需要判断项目列表中是否存在
            const canFind = projectData.find(item => item.projectName === validData.projectName);
            if (canFind) {
                message.warning('该项目已存在，请更换新项目名，或者在已有的项目中修改');
                return;
            }
            if (pName) {
                setProjectData(pre => {
                    const newData = [...pre];
                    const index = newData.findIndex(item => item.projectName === pName);
                    const copyItem = newData[index];
                    newData.splice(index, 1, {
                        ...copyItem,
                        projectName: validData.projectName
                    })
                    setCurrentProject(newData[index]);
                    return newData;
                })
                setPName('');
            } else {
                setProjectData((pre) => ([
                    ...pre,
                    {
                        projectName: validData.projectName,
                        toDo: [],
                        inProgress: [],
                        done: []
                    }
                ]))
                setCurrentProject({
                    projectName: validData.projectName,
                    toDo: [],
                    inProgress: [],
                    done: []
                })
            }
            setIsModalOpen(false);
        }
    };

    const handleEditName = (eProjectName) => {
        // alert(eProjectName)
        setPName(eProjectName)
        setIsModalOpen(true)
    }

    return (
        <div className='side'>
            <div className="side-header">
                <div>项目</div>
                <div >
                    {/* <img src="../../assets/add-icon2.png" alt="添加" onClick={handleAdd} /> */}
                    <img src={addIcon} alt="添加" onClick={handleAdd} />
                    <Popconfirm
                        title="是否要删除当前任务?"
                        onConfirm={confirm}
                        okText="是"
                        cancelText="否"
                        okButtonProps={{ style: { 'backgroundColor': '#E53934', border: 'none' } }}
                    >
                        {/* <img src="src/assets/remove-icon.png" alt="删除" /> */}
                        <img src={removeIcon} alt="删除" />
                    </Popconfirm>
                </div>
                <MyModal
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    form={form}
                    pName={pName}
                />
            </div>
            <div className="side-body">
                {
                    projectData && projectData.map((item, index) => (
                        <div
                            className={currentProject.projectName === item.projectName ? 'side-menu side-active' : 'side-menu'}
                            key={index}
                            onClick={() => handleClick(item)}
                        >
                            <div className='pName'>{item.projectName}</div>
                            <img src={editIcon} alt="编辑" onClick={() => handleEditName(item.projectName)} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Side