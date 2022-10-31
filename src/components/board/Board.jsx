import React, { useState } from 'react';
import Column from './Column';
import Card from './Card';
import './Board.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CardModal from '../common/CardModal';



const Board = ({ projectData, currentProject, setProjectData, setCurrentProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tag, setTag] = useState('toDo');
    const [id, setId] = useState('')

    const handleRemoveCard = (id, title) => {
        setProjectData(pre => {
            const newData = [...pre];
            newData.forEach(item => {
                if (item.projectName === currentProject.projectName) {
                    if (item) {
                        const index = item[title].findIndex(item => item.id === id);
                        item[title].splice(index, 1);
                    }
                }
            })
            return newData;
        })
    }

    const getItems = (title) => {
        //这里注意📢 当删除完数据时，直接返回
        if (projectData.length === 0) return;
        const res = projectData.find(item => item.projectName === currentProject.projectName);

        if (!res) return
        return res[title]
            .map((item, index) => {
                if (!item) return

                return (
                    < Draggable draggableId={item.id} index={index} key={item.id} >
                        {
                            (provided) => {
                                return (
                                    <div>
                                        <Card
                                            item={item}
                                            provided={provided}
                                            handleRemoveCard={handleRemoveCard}
                                            title={title}
                                            isModalOpen={isModalOpen}
                                            setIsModalOpen={setIsModalOpen}
                                            setProjectData={setProjectData}
                                            currentProject={currentProject}
                                            handleEditCard={handleEditCard}
                                        />
                                    </div>
                                )
                            }
                        }
                    </ Draggable>
                )
            })
    }

    const handleDrag = (result) => {
        const { source, destination } = result;
        // 这里注意📢 source和destination可能为空，即当拖拽到不属于拖拽的位置时
        if (!source || !destination) return;

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            console.log("they're equal");
            return;
        }

        // console.log(source, destination)
        const copyItem = currentProject[source.droppableId][source.index];
        // 移除source中拖拽的card
        // 将移除的card移入destination中
        setProjectData((pre) => {
            // console.log(pre)
            const newData = [...pre]
            newData.forEach((item) => {
                if (item.projectName === currentProject.projectName) {
                    item[source.droppableId].splice(source.index, 1);
                    item[destination.droppableId].splice(destination.index, 0, copyItem);
                }
            })
            setCurrentProject(() => {
                const index = newData.findIndex(item => item.projectName === currentProject.projectName);
                return newData[index];

            })
            return newData;
        })

    }

    const handleAddCard = (sstag) => {
        setTag(sstag);
        setIsModalOpen(true);
    }

    const handleEditCard = (cid) => {
        setId(cid);
        setIsModalOpen(true);
    }

    return (
        <DragDropContext onDragEnd={handleDrag}>
            <div className='board'>
                <div className="board-header">
                    任务看板
                </div>
                <div className="board-body">
                    <Droppable droppableId='toDo'>
                        {
                            (provided) => (
                                <Column title="toDo" provided={provided} handleAddCard={() => handleAddCard("toDo")}>
                                    {getItems("toDo")}
                                    {provided.placeholder}
                                    <CardModal
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        setProjectData={setProjectData}
                                        title={tag}
                                        currentProject={currentProject}
                                        setCurrentProject={setCurrentProject}
                                        id={id}
                                        setId={setId}
                                        projectData={projectData}
                                    />
                                </Column>
                            )
                        }
                    </Droppable>
                    <Droppable droppableId='inProgress'>
                        {
                            (provided) => (
                                <Column title="inProgress" provided={provided} handleAddCard={() => handleAddCard("inProgress")}>
                                    {getItems("inProgress")}
                                    {provided.placeholder}
                                    <CardModal
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        setProjectData={setProjectData}
                                        title={tag}
                                        currentProject={currentProject}
                                        setCurrentProject={setCurrentProject}
                                        id={id}
                                        setId={setId}
                                        projectData={projectData}
                                    />
                                </Column>
                            )
                        }
                    </Droppable>
                    <Droppable droppableId='done'>
                        {
                            (provided) => (
                                <Column title="done" provided={provided} handleAddCard={() => handleAddCard("done")}>
                                    {getItems("done")}
                                    {provided.placeholder}
                                    <CardModal
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                        setProjectData={setProjectData}
                                        title={tag}
                                        currentProject={currentProject}
                                        setCurrentProject={setCurrentProject}
                                        id={id}
                                        setId={setId}
                                        projectData={projectData}
                                    />
                                </Column>
                            )
                        }
                    </Droppable>
                </div>
            </div>
        </DragDropContext>

    )
}

export default Board