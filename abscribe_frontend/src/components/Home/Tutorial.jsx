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

  const handleFeatureClick = (featureKey) => {
    setCurrentGif(gifData[featureKey]);
  };

  const handleStartTask = () => {
    navigate("/task");
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
        <p>
                Hover over the cards below to see how the <a href="https://abtestingtools-frontend.up.railway.app/#/">Abscribe tool</a> can assist you with your writing.
              </p>
          <div className="row mt-4"></div>
          
          <div className="card mt-4">
            <div className="card-body" style={{ paddingBottom: 0 }}>
              {/* <h2 className="card-title">Instructions</h2> */}
             
            </div>
            <div className="card-body" style={{ paddingTop: 0 }}>
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
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
              {showButton && (
                <Button
                  className="mt-2"
                  onClick={handleStartTask}
                  variant="outline-dark"
                  size="lg"
                >
                  Start Task
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
