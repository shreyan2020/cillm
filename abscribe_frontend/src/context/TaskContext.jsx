import React, { createContext, useState, useEffect } from 'react';
import { apiClient } from '../services/abscribeAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskID, setTaskID] = useState(null);
  const [prolificID, setProlificID] = useState(null);
  const [activityLog, setActivityLog] = useState({
    buttonClicks: [],
    generatedContent: [],
    keyLogs: []
  });
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    console.log('Activity log updated:', activityLog);
  }, [activityLog]);

  const logButtonClick = (action) => {
    const logEntry = {
      action: action,
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prevLog) => ({
      ...prevLog,
      buttonClicks: [...prevLog.buttonClicks, logEntry],
    }));
    console.log('Button click logged:', logEntry);
  };

  const logGeneratedContent = (feature, prompt, response) => {
    const logEntry = {
      feature: feature,
      prompt: prompt,
      response: response,
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prevLog) => ({
      ...prevLog,
      generatedContent: [...prevLog.generatedContent, logEntry],
    }));
    console.log('Generated content logged:', logEntry);
  };

  const logKeyPress = (key) => {
    const logEntry = { key: key, timestamp: new Date().toISOString() };
    setActivityLog((prevLog) => ({
      ...prevLog,
      keyLogs: [...prevLog.keyLogs, logEntry],
    }));
    console.log('Key press logged:', logEntry);
  };

  const saveActivityLog = async (documentID) => {
    try {
      const activityData = {
        document_id: documentID,
        prolific_id: prolificID,
        task_id: taskID,
        activity_log: activityLogs[taskID] || { buttonClicks: [], generatedContent: [], keyLogs: [] },
      };
      await apiClient.post("/log_activity", activityData);
      console.log("Activity log saved successfully");
      // clearActivityLog(taskID); // Clear the activity log after saving
    } catch (error) {
      console.error("Failed to save activity log:", error);
    }
  };

  const clearActivityLog = (taskID) => {
    setActivityLogs((prevLogs) => {
      const newLogs = { ...prevLogs };
      delete newLogs[taskID];
      return newLogs;
    });
    console.log(`Activity log for task ${taskID} cleared.`);
  };
  const addCompletedTask = (taskID) => {
    setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, taskID]);
  };

  return (
    <TaskContext.Provider
      value={{
        taskID,
        setTaskID,
        prolificID,
        setProlificID,
        activityLog,
        logButtonClick,
        logGeneratedContent,
        logKeyPress,
        completedTasks,
        addCompletedTask,
        saveActivityLog,
        clearActivityLog,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
