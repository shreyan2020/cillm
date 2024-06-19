import React, { createContext, useState } from 'react';

// Create the context object
export const TaskContext = createContext();

// Create the provider component
export const TaskProvider = ({ children }) => {
  const [taskID, setTaskID] = useState(null); // Current task ID
  const [completedTasks, setCompletedTasks] = useState([]); // List of completed tasks
  const [prolificID, setProlificID] = useState(null); // Prolific ID

  // Function to add a task to the list of completed tasks
  const addCompletedTask = (taskID) => {
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskID]);
  };

  return (
    <TaskContext.Provider
      value={{
        taskID,
        setTaskID,
        completedTasks,
        addCompletedTask,
        prolificID,
        setProlificID,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
