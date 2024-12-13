import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/mutations';
import '@fortawesome/fontawesome-free/css/all.min.css';  // Importing FontAwesome CSS
import '../styles/AddTask.css';  // Import the CSS file

const AddTask = ({ taskLists, addTaskToList }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [selectedListId, setSelectedListId] = useState('');
    const [isFastTask, setIsFastTask] = useState(false);  // State for toggling Fast Task

    const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
        onCompleted: (data) => {
            const newTask = data.createTask;
            addTaskToList(newTask, selectedListId);

            setTitle('');
            setPriority('Low');
            setDeadline('');
            setDescription('');
            setSelectedListId(taskLists[0]?.id);
        },
        onError: (err) => {
            console.error('Error creating task:', err);
        },
    });

    const handleAddTask = (e) => {
        e.preventDefault();

        if (title.trim() !== '') {
            createTask({
                variables: {
                    title,
                    priority,
                    deadline: deadline || null,
                    description: description || '',
                    completed: false,
                    listId: selectedListId,
                },
            });


        }
    };

    useEffect(() => {
        if (taskLists.length > 0 && !selectedListId) {
            setSelectedListId(taskLists[0].id);  // Set the first list ID as default
        }
    }, [taskLists, selectedListId, setSelectedListId])


    return (
        <form onSubmit={handleAddTask} className="add-task-card">
            <label>
                Create New Task
                <span
                    onClick={() => setIsFastTask(!isFastTask)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                >
                    {!isFastTask ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
                </span>
            </label>

            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                />
            </div>

            {!isFastTask && (
                <>
                    <div>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Task Description"
                        />
                    </div>
                </>
            )}

            <div>
                <select
                    value={selectedListId}
                    onChange={(e) => setSelectedListId(e.target.value)}
                >
                    {taskLists.map((list) => (
                        <option key={list.id} value={list.id}>
                            {list.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </button>
            {error && <p>Error: {error.message}</p>}
        </form>
    );
};

export default AddTask;
