import React from 'react'

const changeTitle = {
    toDo: '待解决',
    inProgress: '解决中',
    done: '已完成'
}

const addIcon = require('../../assets/add-icon2.png');

const Column = ({ title, children, provided, handleAddCard }) => {
    return (
        <div
            className='column'
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            <div className="column-title">
                <span>{changeTitle[title]}</span>
                <img src={addIcon} alt="添加任务" onClick={handleAddCard} />
            </div>
            <div className="column-body">
                {children}
            </div>
        </div>
    )
}

export default Column