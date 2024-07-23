// src/components/Tutorial.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import GifCarousel from "./GifSlideshow";
import { createDocument } from "../../services/documentService";
import { TaskContext } from "../../context/TaskContext";

export default function Tutorial({ showButton = true }) {
  const navigate = useNavigate();
  // const [sandboxOpened, setSandboxOpened] = useState(false);
  // const [sandboxClosed, setSandboxClosed] = useState(false);
  const { prolificID, setProlificID } = useContext(TaskContext);
//   const sandboxDocumentContent = `
//  <p>Feel free to play around with the features before you begin your new task.</p>
//     <p>Here are some steps you may want to go through:</p>
//     <ol>
//       <li>Type @ai and some text (either in English or Spanish) to generate a paragraph.</li>
//       <li>Select the paragraph, right-click, and select <b>Generate variation</b>.</li>
//       <li>Select all the recipes.</li>
//     </ol>
//     <p>Once you are done you can simply close the tab and continue with your actual task.</p>
//     <p><b>Note:</b> Instructions can be found in the top right corner.</p>
//     <p><b>Note:</b> If you do not close this tab then the task cannot begin.</p>`;
  const handleStartTask = (taskType) => {
    // if (taskType === "sandbox") {
    //   // setTaskID("sandbox");
    //   createDocument(sandboxDocumentContent, "sandbox_task", prolificID, "Welcome to Sandbox")
    //     .then((document) => {
    //       console.log("Document created in backend");
    //       const newTab = window.open(
    //         `/#/document/${document._id["$oid"]}`,
    //         "_blank"
    //       );

    //       // Track when the new tab is closed
    //       const interval = setInterval(() => {
    //         if (newTab.closed) {
    //           clearInterval(interval);
    //           setSandboxClosed(true);
    //         }
    //       }, 500);

    //       setSandboxOpened(true);
    //     })
    //     .catch((error) =>
    //       console.error("Failed to create document in backend:", error)
    //     );
    // } else {
      navigate("/task");
    // }
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="col-md-12">
           
          </div>

          <div className="card mt-4">
          <div className="card-body">
          <p className="card-text">
              Instead of writing the advertisement on your own, you will be able
              to utilize an AI-based writing assistant called ABScribe. Note
              that you do not have to use it in order to complete the task. This
              decision is entirely up to you. ABScribe is [...] You can
              familiarize yourself with the program by seeing the following gifs
              explaining each functionality that you can use to write a
              persuasive text. Furthermore, you will go through a very short
              mandatory tutorial before writing your ad. This instruction will
              be available throughout the task in the top left corner of the
              screen. Look for an Instruction button.
            </p>
            </div>
            <div className="card-body">
              <GifCarousel />
              <div className="card-body">
              {/* {showButton && !sandboxOpened && (
                <Button
                  className="mt-2 me-3"
                  onClick={() => handleStartTask("sandbox")}
                  variant="outline-dark"
                  size="lg"
                >
                  Sandbox Environment
                </Button>
              )} */}
              {showButton && (
                <Button
                  className="mt-2"
                  onClick={() => handleStartTask("main")}
                  variant="outline-dark"
                  size="lg"
                  // disabled={!sandboxClosed}
                >
                  Start Task
                </Button>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
