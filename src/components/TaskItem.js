import React, { useState } from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, moveTask, listId, taskLists }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    const handleMoveTask = (targetListId) => {
        moveTask(task.id, listId, targetListId);
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask({ ...updatedTask, [name]: value });
    };

    const handleSave = () => {
        // Save the updated task here (you can call a function like `saveTask(updatedTask)`)
        setIsEditing(false);
    };

    const getPriorityIcon = (priority) => {
        console.log(priority);
        if (priority === "High") {
            return <i className="fas fa-circle high-priority"></i>;
        } else if (priority === "Medium") {
            return <i className="fas fa-circle medium-priority"></i>;
        } else {
            return <i className="fas fa-circle low-priority"></i>;
        }
    };

    return (
        <div className="task-item">
            {/* Edit icon */}
            <i className="fas fa-edit edit-icon" onClick={handleEditClick}></i>

            <div className="task-header">
                <h4>{isEditing ? (
                    <input
                        type="text"
                        name="title"
                        value={updatedTask.title}
                        onChange={handleChange}
                    />
                ) : (
                    updatedTask.title
                )}</h4>

                <div className="task-priority">
                    <strong>Priority:</strong>
                    {isEditing ? (
                        <select
                            name="priority"
                            value={updatedTask.priority}
                            onChange={handleChange}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    ) : (
                        getPriorityIcon(updatedTask.priority)
                    )}
                </div>

                <div className="task-deadline">
                    <strong>Deadline:</strong>
                    {isEditing ? (
                        <input
                            type="date"
                            name="deadline"
                            value={updatedTask.deadline}
                            onChange={handleChange}
                        />
                    ) : (
                        updatedTask.deadline
                    )}
                </div>
            </div>

            {/* Dropdown for moving task */}
            <div className="move-task-dropdown">
                <button className="move-button">Move Task</button>
                <div className="dropdown-content">
                    {taskLists.map((list) =>
                        list.id !== listId ? (
                            <button key={list.id} onClick={() => handleMoveTask(list.id)}>
                                {list.title}
                            </button>
                        ) : null
                    )}
                </div>
            </div>

            {/* Save button when in edit mode */}
            {isEditing && (
                <button className="save-button" onClick={handleSave}>Save</button>
            )}
        </div>
    );
};

export default TaskItem;
