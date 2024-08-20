// src/components/Tutorial.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import aicont from "../../resources/ai_cont.gif";
import aicreaterecipe from "../../resources/ai_create_recipe.gif";
import aihelp from "../../resources/ai_help.gif";
import airecipe from "../../resources/ai_recipe.gif";

export default function Tutorial({ showButton = true }) {
  const navigate = useNavigate();
  const { prolificID } = useContext(TaskContext);
  const [currentGif, setCurrentGif] = useState(aihelp);
  const [currentDescription, setCurrentDescription] = useState(
    featureDescriptions["ai-help"].description
  );

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
        "Create variations by first clicking 'Create Variations,' then choose one of the pre-defined options below.",
    },
    "ai-create-recipe": {
      title: "Create new variations",
      description:
        "You can either use existing variations or create your own.",
    },
    "ai-cont": {
      title: "Generate continuation for your written text",
      description:
        "If you are stuck on a text, you can ask AI to write its continuation.",
    },
  };

  const handleFeatureClick = (featureKey) => {
    setCurrentGif(gifData[featureKey]);
    setCurrentDescription(featureDescriptions[featureKey].description);
  };

  const handleStartTask = () => {
    navigate("/task");
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <p>
            Hover over the cards below to see how the{" "}
            <a href="https://abtestingtools-frontend.up.railway.app/#/">
              ABScribe tool
            </a>{" "}
            can assist you with your writing.
          </p>

          <div className="row mt-4"></div>

          <div className="card mt-4">
            <div className="card-body" style={{ paddingBottom: 0 }}>
            </div>
            <div className="card-body" style={{ paddingTop: 0 }}>
              <div className="row row-cols-1 row-cols-md-4 mt-2">
                {Object.keys(featureDescriptions).map((key) => (
                  <div className="col mb-2" key={key}>
                    <div
                      className="feature-card card h-100"
                      onMouseOver={() => handleFeatureClick(key)}
                      onClick={() => handleFeatureClick(key)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                        transition: "transform 0.2s",
                        padding: "10px",
                        textAlign: "center"
                      }}
                    >
                      <div
                        className="card-body"
                        style={{ padding: "10px" }}
                      >
                        <h5
                          className="card-title"
                          style={{ fontSize: "14px", color: "#495057" }}
                        >
                          {featureDescriptions[key].title}
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <img
                    src={currentGif}
                    className="img-fluid"
                    alt="Feature GIF"
                    style={{ maxHeight: "400px", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
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
                    }}
                  >
                    {currentDescription}
                  </div>
                </div>
              </div>
              {showButton && (
                <div className="text-center mt-4">
                  <Button
                    className="mt-2"
                    onClick={handleStartTask}
                    variant="outline-dark"
                    size="lg"
                  >
                    Start Task
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
