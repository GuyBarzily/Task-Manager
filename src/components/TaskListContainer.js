import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { CREATE_TASK_LIST, GET_ALL_TASK_LISTS, UPDATE_TASK_LIST_VISIBILITY } from '../graphql/mutations'; // Import the mutations
import TaskList from './TaskList';
import AddTask from './AddTask';
import ListVisibilityDropDown from './ListVisibilityDropDown';
import '../styles/TaskListContainer.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import the default CSS

const TaskListContainer = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [searchParam, setSearchParam] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [updateTaskListVisibility] = useMutation(UPDATE_TASK_LIST_VISIBILITY);
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

    // Fetch all task lists on component mount
    const { loading: queryLoading, error: queryError, data: listData, refetch } = useQuery(GET_ALL_TASK_LISTS, {
        onCompleted: (listData) => {
            console.log('Task lists fetched:', listData);
            setTaskLists(listData.taskLists); // Update state with fetched task lists
        },
    });

    const [newListTitle, setNewListTitle] = useState(''); // State for new list title



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

    const toggleVisibility = async (listId) => {
        try {
            // Call the mutation to update visibility on the server
            const { data } = await updateTaskListVisibility({
                variables: {
                    id: listId,
                    visible: !taskLists.find(list => list.id === listId).visible  // Toggle visibility
                }
            });

            // Update the local state with the new visibility value
            setTaskLists((prevLists) =>
                prevLists.map((list) =>
                    list.id === listId ? { ...list, visible: data.updateTaskListVisibility.isVisible } : list
                )
            );
        } catch (error) {
            console.error('Error updating visibility:', error);
        }
    };

    useEffect(() => {
        if (searchParam) {
            // Filter tasks based on the search parameter
            const filtered = taskLists
                .map(list => ({
                    ...list,
                    tasks: list.tasks.filter(task =>
                        task.title.toLowerCase().includes(searchParam.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchParam.toLowerCase())
                    )
                }))
                .filter(list => list.tasks.length > 0); // Only include lists with filtered tasks
            setFilteredTasks(filtered);
        } else {
            setFilteredTasks(taskLists); // If no search, show all tasks
        }
    }, [searchParam, taskLists]);

    const handleSearchChange = (e) => {
        setSearchParam(e.target.value);
    };



    useEffect(() => {
        const intervalId = setInterval(() => {
            // Trigger a refetch every 5 seconds
            console.log('refetch interval')
            refetch();
        }, 5000);

        return () => clearInterval(intervalId);  // Cleanup interval on component unmount
    }, [refetch]);

    // Compare task lists whenever listData changes
    useEffect(() => {
        if (listData) {
            console.log('New task lists:', listData);
            console.log('Current task lists:', taskLists);

            // If lengths differ, show toaster indicating a new list has been added
            if (listData.taskLists.length !== taskLists.length) {
                toast.success('New task list added!');
            } else {
                // If the lengths are the same, check for task additions or removals
                listData.taskLists.forEach((newTaskList) => {
                    const existingTaskList = taskLists.find((taskList) => taskList.id === newTaskList.id);
                    if (existingTaskList) {
                        // Check if tasks have been added or removed
                        const newTaskIds = newTaskList.tasks.map(task => task.id);
                        const oldTaskIds = existingTaskList.tasks.map(task => task.id);

                        // Check for new tasks added
                        newTaskIds.forEach(taskId => {
                            if (!oldTaskIds.includes(taskId)) {
                                toast.success(`New task added `);
                            }
                        });


                    }
                });
            }

            // Update the task lists state with the new data
            setTaskLists(listData.taskLists);
        }
    }, [listData, taskLists]); // Re-run the effect when taskLists or listData changes


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
            </div>

            <div>
                <ListVisibilityDropDown taskLists={taskLists} toggleVisibility={toggleVisibility} />
                <div className="search-container">
                    <input
                        type="text"
                        value={searchParam}
                        onChange={handleSearchChange}
                        placeholder="Search tasks..."
                        className="search-input"
                    />
                    <i className="fas fa-search search-icon" title="Search"></i>
                </div>
            </div>


            <div className="task-list-container">
                {/* Task Lists Column */}
                <div className="task-lists-column">
                    {filteredTasks.map((list) =>
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
            <ToastContainer />
        </div>
    );
};

export default TaskListContainer;
