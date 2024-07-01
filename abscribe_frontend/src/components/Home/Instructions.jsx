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


import aiButtonsGif from "../../resources/ai_buttons_new.gif";
import aiInsertGif from "../../resources/abscribe_ai_insert_new.gif";
import hoverButtonsGif from "../../resources/hover_buttons_new.gif";
import variationComponentGif from "../../resources/variations_new.gif";

import tasksConfig from "../../taskConfig";
import { TaskContext } from "../../context/TaskContext"; 


export default function Instructions({ showCheckbox = true }) {
  const navigate = useNavigate();
  const location = useLocation();


  const { taskID, setTaskID, completedTasks, addCompletedTask, prolificID, setProlificID } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [validationError, setValidationError] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [demo, setDemo] = useState("video");
  const [gif, setGif] = useState({
    "ai-insert": aiInsertGif,
    "ai-buttons": aiButtonsGif,
    "hover-buttons": hoverButtonsGif,
    "variation-component": variationComponentGif,
  });
  console.log('Backend URL:', import.meta.env.REACT_APP_VITE_BACKEND_URL);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prolificID = params.get("prolific_id");
    console.log('prolific_id', prolificID)
    if (prolificID) {
      setProlificID(prolificID);
    }
  }, [location.search, setProlificID]);


const handleSubmit = (event) => {
    event.preventDefault();
    if (isChecked) {
      navigate("/home");
    } else {
      setValidationError("You must agree before proceeding.");
    }
  };



  return (
    <>
      {/* <NavHeader /> */}
      <div className="jumbotron m-3">
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-12">
              <YoutubeEmbed embedId="Bpg4EVIKeEs" />
            </div>
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Instruction</h2>
              {showCheckbox && (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="checkbox"
                      id="agree"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label htmlFor="agree"> I agree</label>
                  </div>
                  {validationError && (
                    <p style={{ color: "red" }}>{validationError}</p>
                  )}
                  <Button
                    className="mt-4"
                    type="submit"
                    variant="outline-dark"
                    size="lg"
                    disabled={!isChecked} // Disable the button if checkbox is not checked
                  >
                    Proceed to Task
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}