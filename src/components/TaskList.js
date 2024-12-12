import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ title, tasks, listId, moveTask }) => {
    return (
        <div className="task-list">
            <h3>{title}</h3>
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        listId={listId}
                        moveTask={moveTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
