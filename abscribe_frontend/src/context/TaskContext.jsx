import React, { createContext, useState, useEffect, useRef } from 'react';
import { apiClient } from '../services/abscribeAPI';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [taskID, setTaskID] = useState(null);
  const [prolificID, setProlificID] = useState(null);
  const [studyID, setStudyID] = useState(null);
  const [questionnaireID, setQuestionnaireID] = useState(null);
  const [activityLog, setActivityLog] = useState({
    buttonClicks: [],
    generatedContent: [],
    keyLogs: [],
    visibilityState: [],
  });
  const [completedTasks, setCompletedTasks] = useState([]);

  const activityLogRef = useRef(activityLog);

  useEffect(() => {
    activityLogRef.current = activityLog;
    // console.log('Activity log updated:', activityLog);
  }, [activityLog]);

  const logButtonClick = (action) => {
    const logEntry = {
      action: action,
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prevLog) => {
      const updatedLog = {
        ...prevLog,
        buttonClicks: [...prevLog.buttonClicks, logEntry],
      };
      activityLogRef.current = updatedLog;
      return updatedLog;
    });
  };

  const logGeneratedContent = (feature, prompt, response) => {
    const logEntry = {
      feature: feature,
      prompt: prompt,
      response: response,
      timestamp: new Date().toISOString(),
    };
    setActivityLog((prevLog) => {
      const updatedLog = {
        ...prevLog,
        generatedContent: [...prevLog.generatedContent, logEntry],
      };
      activityLogRef.current = updatedLog;
      return updatedLog;
    });
  };

  const logKeyPress = (key) => {
    const logEntry = { key: key, timestamp: new Date().toISOString() };
    setActivityLog((prevLog) => {
      const updatedLog = {
        ...prevLog,
        keyLogs: [...prevLog.keyLogs, logEntry],
      };
      activityLogRef.current = updatedLog;
      return updatedLog;
    });
  };

  const saveActivityLog = async (currentDocument, timeSpentOutside) => {
    console.log("Activity log now", activityLogRef.current);
    try {
      const activityData = {
        document_id: currentDocument._id,
        prolific_id: currentDocument.prolific_id,
        task_id: currentDocument.task_id,
        activity_log: activityLogRef.current,
        time_spent_outside: timeSpentOutside,
      };
      await apiClient.post("/log_activity", activityData);
      console.log("Activity log saved successfully", activityData);
      addCompletedTask(currentDocument.task_id);
      clearActivityLog();
    } catch (error) {
      console.error("Failed to save activity log:", error);
    }
  };

  const clearActivityLog = () => {
    const clearedLog = {
      buttonClicks: [],
      generatedContent: [],
      keyLogs: [],
      visibilityState: [],
    };
    setActivityLog(clearedLog);
    activityLogRef.current = clearedLog;
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
        studyID,
        setStudyID,
        prolificID,
        setProlificID,
        questionnaireID,
        setQuestionnaireID,
        activityLog,
        setActivityLog,
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
