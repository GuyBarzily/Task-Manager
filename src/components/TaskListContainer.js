import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { CREATE_TASK_LIST, GET_ALL_TASK_LISTS } from '../graphql/mutations'; // Import the mutation
import TaskList from './TaskList';
import AddTask from './AddTask';
import ListVisibilityDropDown from './ListVisibilityDropDown';
import '../styles/TaskListContainer.css'; // Import the CSS file

const TaskListContainer = () => {
    const [taskLists, setTaskLists] = useState([]);

    // Fetch all task lists on component mount
    const { loading: queryLoading, error: queryError, data: listData } = useQuery(GET_ALL_TASK_LISTS, {
        onCompleted: (listData) => {
            setTaskLists(listData.taskLists); // Update state with fetched task lists
        },
    });

    const [newListTitle, setNewListTitle] = useState(''); // State for new list title

    // Mutation hook for creating a new task list
    const [createTaskList, { loading, error, data }] = useMutation(CREATE_TASK_LIST, {
        onCompleted: (data) => {
            const newList = {
                id: data.createTaskList.id,
                title: data.createTaskList.title,
                tasks: data.createTaskList.tasks,
                visible: data.createTaskList.visible,
            };
            setTaskLists([...taskLists, newList]);
        },
        onError: (err) => {
            console.error('Error creating task list:', err);
        },
    });

    const addNewList = () => {
        if (newListTitle.trim()) {
            createTaskList({
                variables: {
                    title: newListTitle,
                    taskIds: [],  // Empty array for tasks
                    visible: true,
                },
            });
            setNewListTitle(''); // Clear input field after adding the list
        }
    };

    const addTaskToList = (task, listId) => {
        const list = taskLists.find((taskList) => taskList.id === listId);
        console.log(listId)
        console.log(list)
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


    // Loading and error handling
    if (queryLoading) return <p>Loading task lists...</p>;
    if (queryError) return <p>Error: {queryError.message}</p>;

    return (
        <div>
            <div className="add-new-list">
                <input
                    type="text"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    placeholder="New Task List Name"
                />
                <button onClick={addNewList} disabled={loading}>
                    {loading ? 'Creating...' : 'Add New List'}
                </button>
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
                <ListVisibilityDropDown taskLists={taskLists} toggleVisibility={toggleVisibility} />
            </div>

            <div className="task-list-container">
                {/* Task Lists Column */}
                <div className="task-lists-column">
                    {taskLists.map((list) =>
                        list.visible && (
                            <TaskList
                                key={list.id}
                                title={list.title}
                                tasks={list.tasks}
                                listId={list.id}
                                moveTask={moveTaskBetweenLists}
                                taskLists={taskLists}
                            />
                        )
                    )}
                </div>

                {/* Add Task Column */}
                <div className="add-task-column">
                    <AddTask taskLists={taskLists} addTaskToList={addTaskToList} />
                </div>
            </div>
        </div>
    );
};

export default TaskListContainer;
