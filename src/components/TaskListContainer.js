import React, { useState } from 'react';
import TaskList from './TaskList';
import AddTask from './AddTask';
import ListVisibilityDropDown from './ListVisibilityDropDown';
import '../styles/TaskListContainer.css'; // Import the CSS file

const TaskListContainer = () => {
    const [taskLists, setTaskLists] = useState([
        { id: 1, title: 'Task Pool', tasks: [], visible: true },
        { id: 2, title: 'To Do', tasks: [], visible: true },
        { id: 3, title: 'In Progress', tasks: [], visible: true },
        { id: 4, title: 'Completed', tasks: [], visible: true },
    ]);

    const [newListTitle, setNewListTitle] = useState(''); // State for new list title

    // Add a new task list
    const addNewList = () => {
        if (newListTitle.trim()) {
            const newList = {
                id: taskLists.length + 1,
                title: newListTitle,
                tasks: [],
                visible: true,
            };
            setTaskLists([...taskLists, newList]);
            setNewListTitle(''); // Clear input field after adding the list
        }
    };

    const addTaskToList = (task, listId) => {
        const list = taskLists.find((taskList) => taskList.id === listId);
        if (list) {
            const updatedList = { ...list, tasks: [...list.tasks, task] };
            setTaskLists((prevLists) =>
                prevLists.map((listItem) =>
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

    const toggleVisibility = (listId) => {
        setTaskLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId ? { ...list, visible: !list.visible } : list
            )
        );
    };

    return (
        <div >
            <div className="add-new-list">
                <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="New Task List Name"
                />
                <button onClick={addNewList}>Add New List</button>
                <ListVisibilityDropDown taskLists={taskLists} toggleVisibility={toggleVisibility} />

            </div>
            <div className="task-list-container">
                {/* Task Lists Column */}
                <div className="task-lists-column">
                    {taskLists.map((list) => (
                        list.visible && ( // Only render the TaskList if the list is visible
                            <TaskList
                                key={list.id}
                                title={list.title}
                                tasks={list.tasks}
                                listId={list.id}
                                moveTask={moveTaskBetweenLists}
                                taskLists={taskLists}
                            />
                        )
                    ))}
                </div>


                {/* Add Task Column */}
                <div className="add-task-column">
                    <AddTask taskLists={taskLists} addTask={addTaskToList} />
                </div>
            </div>

        </div>
    );
};

export default TaskListContainer;
