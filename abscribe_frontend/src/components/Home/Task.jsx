import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import YoutubeEmbed from "./YoutubeEmbed";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {
  faDemocrat,
  faFilePdf,
  faFilePen,
  faHandSparkles,
  faMagic,
  faPeace,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import eustressEmail from "../../resources/eustressEmail";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faChrome,
  faGithub,
  faSafari,
} from "@fortawesome/free-brands-svg-icons";
import Button from "react-bootstrap/Button";
import {
  getDocuments,
  createDocument,
  deleteDocument,
} from "../../services/documentService";
import abscribegif from "../../resources/abscribe.gif";
import nsflogo from "../../resources/nsf.png";
import dgplogo from "../../resources/dgp.png";
import iailogo from "../../resources/iai.png";
import NavHeader from "../Header/NavHeader";
import aiButtonsGif from "../../resources/ai_buttons_new.gif";
import aiInsertGif from "../../resources/abscribe_ai_insert_new.gif";
import hoverButtonsGif from "../../resources/hover_buttons_new.gif";
import variationComponentGif from "../../resources/variations_new.gif";
// import tasksConfig from "../../configs/taskConfigA.js";
import { TaskContext } from "../../context/TaskContext";
import "../../scss/home.scss";


import aicont from "../../resources/ai_cont.gif";
import aicreaterecipe from "../../resources/ai_create_recipe.gif";
import aihelp from "../../resources/ai_help.gif";
import airecipe from "../../resources/ai_recipe.gif";

export default function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskID, setTaskID, studyID, setStudyID, completedTasks, addCompletedTask, prolificID, setProlificID, setQuestionnaireID } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [tasksConfig, setTasksConfig] = useState(null);
  const [currentGif, setCurrentGif] = useState(aihelp);

  // const [demo, setDemo] = useState("video");
  const gifData = {
    "ai-help": aihelp,
    "ai-cont": aicont,
    "ai-create-recipe": aicreaterecipe,
    "ai-recipe": airecipe,
  };
  const featureDescriptions = {
    "ai-help": {
      title: "Generate text with AI Insert",
      description:
        "ABScribe makes it easy to stream text from AI directly into the document. Simply type @ai followed by a prompt and press enter.",
    },
    "ai-recipe": {
      title: "Generate variations with AI Buttons",
      description:
        "Create variations by first clicking create variations and then clicking on one of the pre-defined variation buttons",
    },
    "ai-create-recipe": {
      title: "Create new variations",
      description:
        "You can either use existing variation or create your own",
    },
    "ai-cont": {
      title: "Generate continuation for your written text",
      description:
        "If you are stuck on a text, you can ask AI to write it's continuation",
    },
  };

  useEffect(() => {
    // Dynamically import the task configuration based on the taskType
    const loadTaskConfig = async () => {
      try {
        let configModule;
        console.log('sads',studyID)
        switch (studyID) {
          case '66aca63c781c99be382101f6':
            configModule = await import('../../configs/stage1study1EN.js');
            break;
          case '66aca69be884d495377c3f30':
            configModule = await import('../../configs/stage1study1ES.js');
            break;
          default:
            configModule = await import('../../configs/stage1study1EN.js');
            break;
        }
        setTasksConfig(configModule.default);
        // console.log('taskType', tasksConfig.order)
      } catch (error) {
        console.error('Error loading task configuration:', error);
      }
    };

    if (studyID) {
      loadTaskConfig();
    }
  }, [studyID]);

  useEffect(() => {
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
        window.location.href = `https://app.prolific.com/submissions/complete?cc=${tasksConfig.redirectCode}`;
      }
    }
  }, [tasksConfig, completedTasks, setTaskID, navigate]);

  // useEffect(() => {
  //   const nextTaskIndex = completedTasks.length;
  //   if (nextTaskIndex < tasksConfig.order.length) {
  //     const nextTaskID = tasksConfig.order[nextTaskIndex];
  //     const task = tasksConfig.tasks.find((task) => task.id === nextTaskID);
  //     setTaskID(nextTaskID);
  //     setCurrentTask(task);
  //     setUserAnswers({}); // Reset user answers for the new task
  //   } else {
  //     window.location.href = "https://www.prolific.com";
  //   }
  // }, [completedTasks, setTaskID, navigate]);

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleFeatureClick = (featureKey) => {
    setCurrentGif(gifData[featureKey]);
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
        const newTaskID = currentTask.id;
        console.log("Prolific ID:", prolificID, "task_id", newTaskID);
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
      {/* <NavHeader /> */}
      <div className="jumbotron m-3">
        <div className="container">
          <div className="card mt-4">
            <div className="card-body">
              <p className="card-text">
                <h4>{currentTask.name}</h4>
              </p>
              {!currentTask.id.startsWith("sandbox_task") && (
                <>
                <h5>{currentTask.hoverText}</h5>
                </>
              )}
              <p>
                {currentTask.missionStatement}
              </p>
              {!currentTask.id.startsWith("sandbox_task") && (
                <>
                  <h5>Questions:</h5>
                  <form>
                    <div className="mb-3">
                      {currentTask.questionSet.map((question, index) => (
                        <div key={index}>
                          <p>{question.question}</p>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                              <p><input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={userAnswers[index] === option}
                                onChange={() => handleAnswerChange(index, option)}
                              />
                                <label>{option}</label>
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </form>
                  {validationError && (
                    <p style={{ color: "red" }}>{validationError}</p>
                  )}
                </>
              )}
  {/* Conditional rendering for sandbox tasks */}
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
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-body" style={{ padding: "10px" }}>
                            <h5 className="card-title" style={{ fontSize: "16px" }}>
                              {featureDescriptions[key].title}
                            </h5>
                            <p className="card-text" style={{ fontSize: "14px" }}>
                              {featureDescriptions[key].description}
                            </p>
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
                      style={{ maxHeight: "400px", objectFit: "contain" }}
                    />
                  </div>
                  <p> {currentTask.noteText} </p>
                </div>
              )}

              <Button
                className="mt-4"
                onClick={handleStartTask}
                variant="outline-dark"
                size="lg"
              >
                {currentTask.id.startsWith("sandbox_task") ? "Start Tutorial" : "Start Writing Task"}
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
