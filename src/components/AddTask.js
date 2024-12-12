import React, { useState } from 'react';
import '../styles/AddTask.css';

const AddTask = ({ taskLists, addTask }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [deadline, setDeadline] = useState('');
    const [selectedListId, setSelectedListId] = useState(taskLists[0]?.id);
    const [description, setDescription] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(true); // Manage form collapse state

    const handleAddTask = (e) => {
        e.preventDefault();

        if (title.trim() !== '') {
            const newTask = {
                id: Date.now(),
                title,
                priority,
                deadline,
                description, // Include description
            };

            addTask(newTask, selectedListId); // Pass the selected list id to add task
            setTitle('');
            setPriority('Low');
            setDeadline('');
            setSelectedListId(taskLists[0]?.id);
            setDescription('');
            setIsCollapsed(true); // Collapse the form after adding task
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed); // Toggle form visibility
    };

    return (
        <div className="add-task-form">
            <h3 onClick={toggleCollapse} className="form-title">
                {isCollapsed ? 'Add Quick Task' : 'Add Task'} {/* Toggle title */}
                <i className={`fas ${isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up'} arrow`}></i> {/* Font Awesome icon */}

            </h3>
            <form onSubmit={handleAddTask} className={`task-form ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="form-group">
                    <label htmlFor="task-title">Title:</label>
                    <input
                        id="task-title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter task title"
                        required
                    />
                </div>

                {!isCollapsed && (
                    <>
                        <div className="form-group">
                            <label htmlFor="task-description">Description:</label>
                            <textarea
                                id="task-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="task-priority">Priority:</label>
                            <select
                                id="task-priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="task-deadline">Deadline:</label>
                            <input
                                id="task-deadline"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="task-list">Select List:</label>
                            <select
                                id="task-list"
                                value={selectedListId}
                                onChange={(e) => setSelectedListId(Number(e.target.value))}
                            >
                                {taskLists.map((list) => (
                                    <option key={list.id} value={list.id}>
                                        {list.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                <button type="submit" className="add-task-button">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
