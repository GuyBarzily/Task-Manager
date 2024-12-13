import React, { useState, useEffect, useCallback } from 'react';
import '../styles/TaskItem.css';
import { UPDATE_TASK } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskItem = ({ task, moveTask, listId, taskLists }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);
    const [updateTask] = useMutation(UPDATE_TASK);

    // Sync the updatedTask with the task prop
    useEffect(() => {
        if (!isEditing) {
            setUpdatedTask(task);
        }
    }, [task, isEditing]);

    // Handle the task move logic
    const handleMoveTask = (targetListId) => {
        moveTask(task.id, listId, targetListId);
    };

    // Toggle edit mode
    const handleEditClick = () => {
        setIsEditing(prev => !prev);
    };

    // Handle form changes in edit mode
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Save the updated task
    const handleSave = async () => {
        console.log("Updated task before save:", updatedTask);  // Log the state to verify its values

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
            toast.error('Failed to update task');
        }
    };

    // Handle task completion change
    const handleCompleteChange = async (e) => {
        const newCompletedStatus = e.target.checked;
        setUpdatedTask((prev) => ({ ...prev, completed: newCompletedStatus }));

        try {
            await updateTask({
                variables: {
                    id: updatedTask.id,
                    title: updatedTask.title,
                    priority: updatedTask.priority,
                    deadline: updatedTask.deadline,
                    description: updatedTask.description,
                    completed: newCompletedStatus
                }
            });
            toast.success('Good job! Task completed.');
        } catch (error) {
            console.error("Error updating task completion status:", error);
            toast.error('Failed to update completion status');
        }
    };

    // Get the appropriate icon based on priority
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
        <div className={`task-item ${updatedTask.completed ? 'completed' : ''}`}>

            {/* Edit icon */}
            <i className="fas fa-edit edit-icon" onClick={handleEditClick}></i>

            <div className="task-header">
                <h4>
                    {isEditing ? (
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        updatedTask.title
                    )}
                </h4>

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
                            value={updatedTask.deadline || ""}
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
                            value={updatedTask.description || ""}
                            onChange={handleChange}
                        />
                    ) : (
                        updatedTask.description
                    )}
                </div>

                {/* Complete checkbox */}
                <div className="task-completion">
                    <label>
                        <input
                            type="checkbox"
                            checked={updatedTask.completed}
                            onChange={handleCompleteChange}
                        />
                        Completed
                    </label>
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

            {/* Toast notifications */}
        </div>
    );
};

export default TaskItem;
