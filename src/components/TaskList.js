import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ title, tasks, listId, moveTask, taskLists }) => {
    const [sortOption, setSortOption] = useState('date'); // Default to sorting by date
    const [sortDirection, setSortDirection] = useState('asc'); // Default to ascending order

    // Sort function based on the selected option and direction
    const sortTasks = (tasks, sortOption, sortDirection) => {
        const sortedTasks = [...tasks];
        switch (sortOption) {
            case 'date':
                sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)); // Sort by date ascending
                break;
            case 'priority':
                const priorityOrder = { Low: 1, Medium: 2, High: 3 }; // Define priority order
                sortedTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]); // Sort by priority ascending
                break;
            case 'completed':
                sortedTasks.sort((a, b) => a.completed - b.completed); // Sort by completed ascending
                break;
            default:
                return tasks;
        }

        // If the sort direction is descending, reverse the sorted array
        if (sortDirection === 'desc') {
            sortedTasks.reverse();
        }

        return sortedTasks;
    };

    const sortedTasks = sortTasks(tasks, sortOption, sortDirection);

    // Toggle the sorting direction
    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="task-list">
            <h3>{title}</h3>

            {/* Sort controls */}
            <div className="sort-controls">
                <div className="sort-option">
                    <label htmlFor="sort-select">Sort by:</label>
                    <div className="sort-selector-container">
                        <select
                            id="sort-select"
                            onChange={(e) => setSortOption(e.target.value)}
                            value={sortOption}
                        >
                            <option value="date">Date</option>
                            <option value="priority">Priority</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button className="sort-toggle" onClick={toggleSortDirection}>
                            <i className={`fas ${sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                        </button>
                    </div>
                </div>
            </div>

            <ul>
                {sortedTasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        listId={listId}
                        moveTask={moveTask}
                        taskLists={taskLists}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
