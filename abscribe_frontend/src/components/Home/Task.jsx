import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import "../../scss/home.scss";

import aicont from "../../resources/ai_cont.gif";
import aicreaterecipe from "../../resources/ai_create_recipe.gif";
import aihelp from "../../resources/ai_help.gif";
import airecipe from "../../resources/ai_recipe.gif";
import savedoc from "../../resources/save_document.gif";
import featureDescriptionsConfig from "../../configs/featureDescriptionsConfig.js";

import {
  getDocuments,
  createDocument,
  deleteDocument,
} from "../../services/documentService";


export default function Task() {
  const navigate = useNavigate();
  const { taskID, setTaskID, studyID, completedTasks, prolificID, setQuestionnaireID, tasksConfig } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [currentGif, setCurrentGif] = useState(aihelp);
  const [currentDescription, setCurrentDescription] = useState("");

  const gifData = {
    "ai-help": aihelp,
    "ai-cont": aicont,
    "ai-create-recipe": aicreaterecipe,
    "ai-recipe": airecipe,
    "save-doc": savedoc,
  };

  const featureDescriptions = featureDescriptionsConfig[studyID]?.features || featureDescriptionsConfig.default.features;

  useEffect(() => {
    console.log(tasksConfig)
    if (tasksConfig) {
        const nextTaskIndex = completedTasks.length;

        if (nextTaskIndex < tasksConfig.order.length) {
            const nextTaskID = tasksConfig.order[nextTaskIndex];
            const task = tasksConfig.tasks.find((task) => task.id === nextTaskID);
            setQuestionnaireID(task.questionnaire_id);
            setTaskID(nextTaskID);
            setCurrentTask(task);
            setUserAnswers({}); // Reset user answers for the new task
        } else {
            // Check if the last completed task was the final one
            const lastCompletedTaskID = completedTasks[completedTasks.length - 1];
            const taskOrder = tasksConfig.order;
            const lastTask = taskOrder[taskOrder.length - 1];

            if (lastCompletedTaskID.startsWith(lastTask)) {
                console.log('Match found: Redirecting...');
                window.location.href = `https://app.prolific.com/submissions/complete?cc=${tasksConfig.redirectCode}`;
            }  else {
                console.log("Last task was not done yet, loading last task");
                // Load the final task instead
                const mainTask = tasksConfig.tasks.find(task => task.id === lastTask);
                if (mainTask) {
                    setQuestionnaireID(mainTask.questionnaire_id);
                    setTaskID(mainTask.id);
                    setCurrentTask(mainTask);
                    setUserAnswers({}); // Reset user answers for the new task
                }
            }
        }
    }
}, [tasksConfig, completedTasks, setTaskID, navigate, setQuestionnaireID]);

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleFeatureClick = (featureKey) => {
    setCurrentGif(gifData[featureKey]);
    setCurrentDescription(featureDescriptions[featureKey].description);
  };

  const handleStartTask = () => {
    if (currentTask.id.startsWith("sandbox_task")) {
      // For sandbox tasks, no need to validate answers, directly create the document
      createDocument(currentTask.tutorial, currentTask.id+"_"+studyID, prolificID)
        .then((document) => {
          console.log("Document created in backend");
          navigate(`/document/${document._id["$oid"]}`);
        })
        .catch((error) => console.error("Failed to create document in backend:", error));
    } else {
      let allAnswersCorrect = true;
      currentTask.questionSet.forEach((q, index) => {
        if (userAnswers[index] !== q.correctAnswer) {
          allAnswersCorrect = false;
        }
      });

      if (allAnswersCorrect) {
        setValidationError(null);
        createDocument(currentTask.tutorial, currentTask.id+"_"+studyID, prolificID)
          .then((document) => {
            console.log("Document created in backend");
            navigate(`/document/${document._id["$oid"]}`);
          })
          .catch((error) => console.error("Failed to create document in backend:", error));
      } else {
        setValidationError('One or more answers are incorrect. Please review your answers.');
      }
    }
  };

  if (!currentTask) {
    return <div>Loading task...</div>;
  }
  
  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="card mt-4">
            <div className="card-body">
              <h4 className="card-title">{currentTask.name}</h4>
              {!currentTask.id.startsWith("sandbox_task") && (
                <h5 className="card-subtitle mb-3">{currentTask.hoverText}</h5>
              )}
              <p className="card-text">{currentTask.missionStatement}</p>
  
              {!currentTask.id.startsWith("sandbox_task") && (
                <>
                  <h5 className="mb-4">Questions:</h5>
                  <form>
                    <div className="mb-3">
                      {currentTask.questionSet.map((question, index) => (
                        <div key={index} className="mb-3">
                          <p>{question.question}</p>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="form-check">
                              <input
                                type="radio"
                                className="form-check-input"
                                name={`question-${index}`}
                                value={option}
                                checked={userAnswers[index] === option}
                                onChange={() => handleAnswerChange(index, option)}
                              />
                              <label className="form-check-label ms-2">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </form>
  
                  {validationError && (
                    <p className="text-danger">{validationError}</p>
                  )}
                </>
              )}
  
              {currentTask.id.startsWith("sandbox_task") && (
                <div>
                  <p>{currentTask.hoverText}</p>
                  <div className="row row-cols-1 row-cols-md-4 mt-2">
                    {Object.keys(featureDescriptions).map((key) => (
                      <div className="col mb-2" key={key}>
                        <div
                          className="feature-card card h-100"
                          onMouseOver={() => handleFeatureClick(key)}
                          onClick={() => handleFeatureClick(key)}
                          style={{
                            cursor: "pointer",
                            textAlign: "center",
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                            transition: "transform 0.2s",
                          }}
                        >
                          <div className="card-body p-2">
                            <h5 className="card-title fs-6">
                              {featureDescriptions[key].title}
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card-body d-flex justify-content-center">
                    <img
                      src={currentGif}
                      className="img-fluid"
                      alt="Feature GIF"
                      style={{ maxHeight: "300px", objectFit: "contain" }}
                    />
                  </div>
                  <div className="mt-4">
                    <div
                      className="description-box"
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "20px",
                        borderRadius: "8px",
                        border: "1px solid #ced4da",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        color: "#495057",
                        textAlign: "center",
                      }}
                      dangerouslySetInnerHTML={{ __html: currentDescription }}
                    />
                  </div>
                  <p>{currentTask.noteText}</p>
                </div>
              )}
  
              <Button
                className="mt-4"
                onClick={handleStartTask}
                variant="outline-dark"
                size="lg"
              >
                {currentTask.id.startsWith("sandbox_task")
                  ? "Start Tutorial"
                  : "Start Writing Task"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
