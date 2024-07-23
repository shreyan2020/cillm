import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import YoutubeEmbed from "./YoutubeEmbed";
import "../../scss/home.scss";
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
import tasksConfig from "../../taskConfig";
import { TaskContext } from "../../context/TaskContext";
import "../../scss/home.scss";

export default function Task() {
  const navigate = useNavigate();
  const location = useLocation();
  const { taskID, setTaskID, completedTasks, addCompletedTask, prolificID, setProlificID } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [validationError, setValidationError] = useState(null);

  const [demo, setDemo] = useState("video");
  const [gif, setGif] = useState({
    "ai-insert": aiInsertGif,
    "ai-buttons": aiButtonsGif,
    "hover-buttons": hoverButtonsGif,
    "variation-component": variationComponentGif,
  });

  useEffect(() => {
    const nextTaskIndex = completedTasks.length;
    if (nextTaskIndex < tasksConfig.order.length) {
      const nextTaskID = tasksConfig.order[nextTaskIndex];
      const task = tasksConfig.tasks.find((task) => task.id === nextTaskID);
      setTaskID(nextTaskID);
      setCurrentTask(task);
      setUserAnswers({}); // Reset user answers for the new task
    } else {
      window.location.href = "https://www.prolific.com";
    }
  }, [completedTasks, setTaskID, navigate]);

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const handleStartTask = () => {
    if (currentTask.id.startsWith("sandbox_task")) {
      // For sandbox tasks, no need to validate answers, directly create the document
      createDocument(currentTask.tutorial, currentTask.id, prolificID)
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
        createDocument(currentTask.tutorial, newTaskID, prolificID)
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
      <NavHeader />
      <div className="jumbotron m-3">
        <div className="container">
          <div className="card mt-4">
            <div className="card-body">
              <p className="card-text">
                {currentTask.name}
              </p>
              <h5>Mission Statement:</h5>
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
              <Button
                className="mt-4"
                onClick={handleStartTask}
                variant="outline-dark"
                size="lg"
              >
                Start Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
