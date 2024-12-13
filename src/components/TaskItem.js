import React, { useState } from 'react';
import '../styles/TaskItem.css';
import { UPDATE_TASK } from '../graphql/mutations';
import { useMutation } from '@apollo/client';



const TaskItem = ({ task, moveTask, listId, taskLists }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({ ...task });


    const [updateTask] = useMutation(UPDATE_TASK);

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

    const handleSave = async () => {
        // Call the mutation to update the task
        try {
            await updateTask({
                variables: {
                    id: updatedTask.id,
                    title: updatedTask.title,
                    priority: updatedTask.priority,
                    deadline: updatedTask.deadline,
                    description: updatedTask.description,
                    completed: updatedTask.completed
                }
            });
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const getPriorityIcon = (priority) => {
        if (priority === "High") {
            return <i className="fas fa-circle high-priority" title="High"></i>;
        } else if (priority === "Medium") {
            return <i className="fas fa-circle medium-priority" title="Medium"></i>;
        } else {
            return <i className="fas fa-circle low-priority" title="Low"></i>;
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
                        updatedTask.deadline ? new Date(Number(updatedTask.deadline)).toLocaleDateString('en-GB') : ''
                    )}
                </div>

                <div className="task-description">
                    <strong>Description:</strong>
                    {isEditing ? (
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                        />
                    ) : (
                        updatedTask.description
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
