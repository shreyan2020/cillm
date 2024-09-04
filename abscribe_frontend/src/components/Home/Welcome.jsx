import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "prismjs/themes/prism.css";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import { apiClient } from '../../services/abscribeAPI';  // Assuming you have an apiClient setup

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { prolificID, setProlificID, studyID, setStudyID, tasksConfig, setTasksConfig } = useContext(TaskContext);
  const [validationError, setValidationError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [englishProficiency, setEnglishProficiency] = useState("");
  const [spanishProficiency, setSpanishProficiency] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prolific_id = params.get("PROLIFIC_PID");
    const study_id = params.get("STUDY_ID");
    
    if (prolific_id) {
      setProlificID(prolific_id);
    }
    if (study_id) {
      setStudyID(study_id);
    }
  }, [location.search, setProlificID, setStudyID]);

  useEffect(() => {
    const loadTaskConfig = async () => {
      try {
        let configModule;
        switch (studyID) {
          case '66d8296a1f4202dbce504533':
            configModule = await import('../../configs/charityTaskConfigEN.js');
            break;
          case '66c63f4f7c3e886b7c9cc498':
            configModule = await import('../../configs/charityTaskConfigES.js');
            break;
          case '66d8461863df672d5ffe15b2':
            configModule = await import('../../configs/charityTaskConfigEN_AE.js');
            break;
          case '66d847204c5ed7a7e6ccde9c':
            configModule = await import('../../configs/charityTaskConfig_ES_AE.js');
            break;
          default:
            configModule = await import('../../configs/charityTaskConfigEN.js');
            break;
        }
        
        if (configModule && configModule.default) {
          setTasksConfig(configModule.default);  // Setting tasksConfig in context
          console.log('Task config loaded:', configModule.default);
        } else {
          console.error('Task config is undefined or null.');
        }
      } catch (error) {
        console.error('Error loading task configuration:', error);
      }
    };

    if (studyID) {
      loadTaskConfig();
    }
  }, [studyID, setTasksConfig]);

  useEffect(() => {
    console.log('Task Config from context after setting:', tasksConfig);
  }, [tasksConfig]);


  const saveParticipantInfo = async (participantData) => {
    try {
      const response = await apiClient.post("/save_participant_info", participantData);
    } catch (error) {
      console.error("Error saving participant info:", error);
      setValidationError("Failed to save participant information. Please try again.");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isChecked) {
      const participantData = {
        prolific_id: prolificID,
        study_id: studyID,
        age: parseInt(age),
        gender: gender,
        english_proficiency: englishProficiency,
        spanish_proficiency: spanishProficiency,
      };
      saveParticipantInfo(participantData);
      console.log('data saved')
      navigate("/instruction");
    } else {
      setValidationError("You must agree before proceeding.");
    }
  };

  const renderConsentText = () => {
    const consentHTML = tasksConfig?.config.consentText || "Something went wrong please contact researcher";
    return <div dangerouslySetInnerHTML={{ __html: consentHTML }} />;
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="row mt-4"></div>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Consent Form</h2>
              {tasksConfig ? renderConsentText() : <p>Loading configuration...</p>}

              <hr style={{ borderTop: "5px solid #bbb" }} />

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="mb-2" htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    className="form-control"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="age" className="mb-2">Age</label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
               
                {tasksConfig && tasksConfig.config.language === "ENG" && (
                  <div className="form-group mb-3">
                    <label htmlFor="englishProficiency" className="mb-2">English Proficiency</label>
                    <select
                      id="englishProficiency"
                      className="form-control"
                      value={englishProficiency}
                      onChange={(e) => setEnglishProficiency(e.target.value)}
                      required
                    >
                      <option value="">Select your English proficiency level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                )}

                {tasksConfig && tasksConfig.config.language === "ESP" && (
                  <div className="form-group mb-3">
                    <label htmlFor="spanishProficiency" className="mb-2">Spanish Proficiency</label>
                    <select
                      id="spanishProficiency"
                      className="form-control"
                      value={spanishProficiency}
                      onChange={(e) => setSpanishProficiency(e.target.value)}
                      required
                    >
                      <option value="">Select your Spanish proficiency level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                )}
                
                <div className="form-group">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    required
                  />
                  <label htmlFor="agree" style={{ paddingLeft: '10px' }}> I Consent</label>
                </div>
                {validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}
                <Button
                  className="mt-4"
                  type="submit"
                  variant="outline-dark"
                  size="lg"
                  disabled={!isChecked}
                >
                  Proceed to Task
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
