// src/components/Tutorial.jsx
import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import featureDescriptionsConfig from "../../configs/featureDescriptionsConfig.js";
import aihelp from "../../resources/ai_help.gif";
import aicont from "../../resources/ai_cont.gif";
import aicreaterecipe from "../../resources/ai_create_recipe.gif";
import airecipe from "../../resources/ai_recipe.gif";
import savedoc from "../../resources/save_document.gif";

export default function Tutorial({ showButton = true }) {
  const { studyID } = useContext(TaskContext);
  const [currentGif, setCurrentGif] = useState(aihelp);
  const [currentDescription, setCurrentDescription] = useState("");
  
  const gifData = {
    "ai-help": aihelp,
    "ai-cont": aicont,
    "ai-create-recipe": aicreaterecipe,
    "ai-recipe": airecipe,
    "save-doc": savedoc,
  };
  const featureDescriptions = featureDescriptionsConfig["Master"]?.features || featureDescriptionsConfig.default.features;

  const handleFeatureClick = (featureKey) => {
    setCurrentGif(gifData[featureKey]);
    setCurrentDescription(featureDescriptions[featureKey].description);
  };

  useEffect(() => {
    // Initialize with the first description and gif by default
    const firstFeatureKey = Object.keys(featureDescriptions)[0];
    setCurrentGif(gifData[firstFeatureKey]);
    setCurrentDescription(featureDescriptions[firstFeatureKey].description);
  }, [featureDescriptions]);

  const handleStartTask = () => {
    // Navigation to task or other logic can be implemented here
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <p>Hover over the cards below to see how the ABScribe tool can assist you with your writing.</p>
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
    </>
  );
}
