import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import '../styles/TaskListContainer.css'; // Import the CSS file

const TaskListContainer = () => {
    const [taskLists, setTaskLists] = useState([
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Progress', tasks: [] },
        { id: 3, title: 'Completed', tasks: [] },
    ]);

    const addTaskToList = (task, listId) => {
        console.log(task);
        console.log(typeof listId);
        const list = taskLists.find(taskList => taskList.id === listId);
        console.log(taskLists)
        console.log(list);

        if (list) {
            console.log('Found list:', list);
            const updatedList = { ...list, tasks: [...list.tasks, task] };
            setTaskLists(prevLists =>
                prevLists.map(listItem =>
                    listItem.id === listId ? updatedList : listItem
                )
            );
        }
    };

    const moveTaskBetweenLists = (taskId, fromListId, toListId) => {
        setTaskLists((prevLists) => {
            const updatedLists = prevLists.map((list) => {
                if (list.id === fromListId) {
                    const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
                    return { ...list, tasks: updatedTasks };
                }
                if (list.id === toListId) {
                    const taskToMove = prevLists
                        .find((list) => list.id === fromListId)
                        .tasks.find((task) => task.id === taskId);
                    return { ...list, tasks: [...list.tasks, taskToMove] };
                }
                return list;
            });
            return updatedLists;
        });
    };

    return (
        <div className="task-list-container">
            {taskLists.map((list) => (
                <TaskList
                    key={list.id}
                    title={list.title}
                    tasks={list.tasks}
                    listId={list.id}
                    moveTask={moveTaskBetweenLists}
                />
            ))}
            <AddTask taskLists={taskLists} addTask={addTaskToList} />
        </div>
    );
};

export default TaskListContainer;
