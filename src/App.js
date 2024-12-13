import React, { useEffect, useState } from 'react';
import TaskListContainer from './components/TaskListContainer';
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [wsConnection, setWsConnection] = useState(null);
  const [message, setMessage] = useState(null);
  const [sendRefetch, setSendRefetch] = useState(false);

  // useEffect(() => {
  //   // Create WebSocket connection
  //   const ws = new WebSocket('ws://localhost:4000/graphql');

  //   // WebSocket open event: connection established
  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket server');
  //     // Send a test subscription or request (replace with actual subscription query)
  //     const subscriptionRequest = {
  //       type: 'start',
  //       id: (Math.random() * 100).toString(),  // Unique subscription ID
  //       payload: {
  //         query: `subscription { taskUpdated { id, title } }`, // Example subscription query
  //         variables: {}
  //       }
  //     };
  //     ws.send(JSON.stringify(subscriptionRequest));
  //   };

  //   // WebSocket message event: receiving messages from the server
  //   ws.onmessage = (event) => {
  //     const receivedData = JSON.parse(event.data);
  //     if (receivedData.id === 'taskUpdate') {
  //       console.log('Received data:', receivedData);

  //       setSendRefetch(true); // Set refetch flag to trigger GraphQL query re-fetching
  //     }
  //   };

  //   // WebSocket error event: handle any errors
  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   // WebSocket close event: handle connection closure
  //   ws.onclose = () => {
  //     console.log('WebSocket connection closed');
  //   };

  //   // Save the WebSocket connection to state for later use
  //   setWsConnection(ws);

  //   // Cleanup WebSocket connection on component unmount
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskListContainer sendRefetch={sendRefetch} setSendRefetch={setSendRefetch} />

    </div>
  );
}

export default App;
