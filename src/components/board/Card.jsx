import React from 'react';
import { Popover } from 'antd';

const removeIcon = require('../../assets/remove-icon.png');
const editIcon = require('../../assets/edit-icon.png');

const Card = ({ item, provided, handleRemoveCard, title, handleEditCard }) => {
    const content = (
        <div>
            <p style={{ color: '#1976D2' }}>
                {item.taskDetail ? item.taskDetail : '暂无详情'}
            </p>
        </div>
    );

    return (
        <div
            className='card'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
        >
            <div className="card-content">
                <p>{item.taskName}</p>
                <Popover content={content} trigger="hover">
                    <a href="">悬浮此处查看详情</a>
                </Popover>
            </div>
            <div className="card-btn">
                <img src={editIcon} alt="编辑" onClick={() => handleEditCard(item.id)} />
                <img src={removeIcon} alt="删除" onClick={() => handleRemoveCard(item.id, title)} />
            </div>
        </div >
    )
}

export default Card