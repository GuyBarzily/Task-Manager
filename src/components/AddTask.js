import React, { useState } from 'react';
import '../styles/AddTask.css';

const AddTask = ({ taskLists, addTask }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [deadline, setDeadline] = useState('');
    const [selectedListId, setSelectedListId] = useState(taskLists[0]?.id);

    const handleAddTask = (e) => {
        e.preventDefault();

        if (title.trim() !== '') {
            const newTask = {
                id: Date.now(),
                title,
                priority,
                deadline,
            };

            addTask(newTask, selectedListId); // Pass the selected list id to add task
            setTitle('');
            setPriority('Low'); // Reset to Low after adding
            setDeadline('');
            setSelectedListId(taskLists[0]?.id); // Reset to default list
        }
    };

    return (
        <div className="add-task-form">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask}>
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

                <button type="submit" className="add-task-button">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
