import React from 'react';
import TaskListContainer from './components/TaskListContainer';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {



  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskListContainer />

    </div>
  );
}

export default App;
