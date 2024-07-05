import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
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
// import screenshotGif from "../resources/screenshot.gif";
// import dfpImg from "../resources/dfp.png";
// import selectiveRevealGif from "../resources/selective_reveal.gif";
// import pauseGif from "../resources/pause.gif";
// import stepsGif from "../resources/steps.gif";
// import markersGif from "../resources/markers.gif";

import aiButtonsGif from "../../resources/ai_buttons_new.gif";
import aiInsertGif from "../../resources/abscribe_ai_insert_new.gif";
import hoverButtonsGif from "../../resources/hover_buttons_new.gif";
import variationComponentGif from "../../resources/variations_new.gif";

import tasksConfig from "../../taskConfig";
import { TaskContext } from "../../context/TaskContext"; 
// import "../scss/home.scss";

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
  // console.log('Backend URL:', import.meta.env.REACT_APP_VITE_BACKEND_URL);
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const prolificID = params.get("prolific_id");
  //   console.log('prolific_id', prolificID)
  //   if (prolificID) {
  //     setProlificID(prolificID);
  //   }
  // }, [location.search, setProlificID]);
  console.log('prolific_id and task id', prolificID, taskID)

  useEffect(() => {
    const nextTaskIndex = completedTasks.length;
    if (nextTaskIndex < tasksConfig.order.length) {
      const nextTaskID = tasksConfig.order[nextTaskIndex];
      const task = tasksConfig.tasks.find((task) => task.id === nextTaskID);
      setTaskID(nextTaskID);
      setCurrentTask(task);
      setUserAnswers({}); // Reset user answers for the new task
    } else {
      // navigate('/prolific');
      window.location.href = "https://www.prolific.com";
    }
  }, [completedTasks, setTaskID, navigate]);

  const handleAnswerChange = (questionIndex, option) => {
    setUserAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };


  const handleStartTask = () => {
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
        // navigate(`/document/${document._id["$oid"]}?taskID=${newTaskID}&prolificID=${prolificID}`);
      })
      .catch((error) =>
        console.error("Failed to create document in backend:", error)
      );
      // navigate(`/editor/${taskID}`);
    } else {
      setValidationError('One or more answers are incorrect. Please review your answers.');
    }
  };
  


  // const handleTryABSCribeButtonClick = () => {
  //   const newTaskID = generateTaskID();
  //   createDocument("", newTaskID)
  //     .then((document) => {
  //       console.log("Document created in backend");
  //       navigate(`/document/${document._id["$oid"]}`);
  //     })
  //     .catch((error) =>
  //       console.error("Failed to create document in backend:", error)
  //     );
  // };


  if (!currentTask) {
    return <div>Loading task...</div>;
  }


  return (
    <>
      <NavHeader />
      <div className="jumbotron m-3">
        <div className="container">
           {/* <div className="col-md-12">
              <YoutubeEmbed embedId="Bpg4EVIKeEs" />
            </div> */}
          {/* <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Persuasive Text Writing for Chairty</h1>
              <p className="lead mt-4">
                Craft persuasive text effortlessly with{" "}
                <strong>ABScribe</strong>, in a clutter-free editing interface
                powered by Large Language Models.
              </p>
            </div>
          </div> */}

          {/* <div className="row mt-4">
            <div className="col-md-12">
              <YoutubeEmbed embedId="Bpg4EVIKeEs" />
            </div>
          </div> */}

          <div className="card mt-4">
            <div className="card-body">
              {/* <h2 className="card-title">Instruction</h2> */}
              <p className="card-text">
                { currentTask.name }
              </p>
              {/* <p className="card-text">
              Instead of writing the advertisement on your own, you will be able to utilize an AI-based writing assistant called ABScribe. Note that you do not have to use it in order to complete the task. This decision is entirely up to you.

ABScribe is [...]

You can familiarize yourself with the program using a short tutorial video on the next page. Furthermore, you will go through a very short mandatory tutorial before writing your ad. You will first complete the tutorial in English [Spanish], then complete your English [Spanish] advertisement, then complete the tutorial in Spanish [English], and finally complete your second advertisement in Spanish [English].

              </p> */}
              <h5>Mission Statement:</h5>
              <p>
              { currentTask.missionStatement }
              </p>
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