import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import YoutubeEmbed from "./YoutubeEmbed";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";

// import {
//   faDemocrat,
//   faFilePdf,
//   faFilePen,
//   faHandSparkles,
//   faMagic,
//   faPeace,
//   faPencil,
// } from "@fortawesome/free-solid-svg-icons";
// import Nav from "react-bootstrap/Nav";
// import { LinkContainer } from "react-router-bootstrap";

// import eustressEmail from "../../resources/eustressEmail";

// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import {
//   faChrome,
//   faGithub,
//   faSafari,
// } from "@fortawesome/free-brands-svg-icons";

// import {
//   getDocuments,
//   createDocument,
//   deleteDocument,
// } from "../../services/documentService";

// import abscribegif from "../../resources/abscribe.gif";
// import nsflogo from "../../resources/nsf.png";
// import dgplogo from "../../resources/dgp.png";
// import iailogo from "../../resources/iai.png";
// import NavHeader from "../Header/NavHeader";
import aiButtonsGif from "../../resources/ai_buttons_new.gif";
import aiInsertGif from "../../resources/abscribe_ai_insert_new.gif";
import hoverButtonsGif from "../../resources/hover_buttons_new.gif";
import variationComponentGif from "../../resources/variations_new.gif";


export default function Tutorial({ showButton = true }) {
  const navigate = useNavigate();
//   const location = useLocation();

//   const [currentTask, setCurrentTask] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [validationError, setValidationError] = useState(null);

//   const [demo, setDemo] = useState("video");
//   const [gif, setGif] = useState({
//     "ai-insert": aiInsertGif,
//     "ai-buttons": aiButtonsGif,
//     "hover-buttons": hoverButtonsGif,
//     "variation-component": variationComponentGif,
//   });

  const handleStartTask = () => {
    // Perform any other necessary actions here
    navigate("/task");
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="col-md-12">
            <YoutubeEmbed embedId="Bpg4EVIKeEs" />
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <p className="card-text">
                Instead of writing the advertisement on your own, you will be
                able to utilize an AI-based writing assistant called ABScribe.
                Note that you do not have to use it in order to complete the
                task. This decision is entirely up to you. ABScribe is [...]
                You can familiarize yourself with the program using a short
                tutorial video on the next page. Furthermore, you will go
                through a very short mandatory tutorial before writing your ad.
                You will first complete the tutorial in English [Spanish], then
                complete your English [Spanish] advertisement, then complete the
                tutorial in Spanish [English], and finally complete your second
                advertisement in Spanish [English].
              </p>
              {showButton &&
              <Button
                className="mt-4"
                onClick={handleStartTask}
                variant="outline-dark"
                size="lg"
              >
                Start Task
              </Button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
