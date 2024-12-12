import React from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, moveTask, listId }) => {
    const handleMoveTask = (targetListId) => {
        moveTask(task.id, listId, targetListId);
    };

    return (
        <div className="task-item">
            <div className="task-header">
                <h4>{task.title}</h4>
                <div className="task-priority">
                    <strong>Priority:</strong> {task.priority}
                </div>
                <div className="task-deadline">
                    <strong>Deadline:</strong> {task.deadline}
                </div>
            </div>

            {/* Dropdown for moving task */}
            <div className="move-task-dropdown">
                <button className="move-button">Move Task</button>
                <div className="dropdown-content">
                    <button onClick={() => handleMoveTask(1)}>To Do</button>
                    <button onClick={() => handleMoveTask(2)}>In Progress</button>
                    <button onClick={() => handleMoveTask(3)}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
