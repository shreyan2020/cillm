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

  // useEffect(() => {
  //   console.log('Activity log updated:', activityLog);
  // }, [activityLog]);

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

  const saveActivityLog = async (currentDocument) => {
    try {
      const activityData = {
        document_id: currentDocument._id,
        prolific_id: currentDocument.prolific_id,
        task_id: currentDocument.task_id,
        activity_log: activityLog,
      };
      await apiClient.post("/log_activity", activityData);
      console.log("Activity log saved successfully");
      addCompletedTask(currentDocument.task_id);
      clearActivityLog();
      // clearActivityLog(taskID); // Clear the activity log after saving
    } catch (error) {
      console.error("Failed to save activity log:", error);
    }
  };

  const clearActivityLog = () => {
    setActivityLog({
      buttonClicks: [],
      generatedContent: [],
      keyLogs: []
    });
    console.log('Activity log cleared');
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
