import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "prismjs/themes/prism.css";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import { apiClient } from '../../services/abscribeAPI'; // Import apiClient
import consentTextConfig from '../../configs/consentTextConfig';

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { prolificID, setProlificID, studyID, setStudyID, setTasksConfig } = useContext(TaskContext);
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
    // Dynamically import the task configuration based on the studyID
    const loadTaskConfig = async () => {
      try {
        let configModule;
        switch (studyID) {
          case '66c90fcc4541f87369be0127':
            configModule = await import('../../configs/NollmEN.js');
            break;
          case '66c516b1d61c7b572205f713':
            configModule = await import('../../configs/stage1study1EN.js');
            break;
          case '66c5e9afb11bf5c62a286fe8':
            configModule = await import('../../configs/stage1study2ENES.js');
            break;
          case '66c616da5ea4ebca7f461ac7':
            configModule = await import('../../configs/stage1study2ENES.js');
            break;
          case '66c63f4f7c3e886b7c9cc498':
            configModule = await import('../../configs/stage1study2ESEN.js');
            break;
          case '66c994e78d5b3da79c6cc853':
            configModule = await import('../../configs/stage1study2ESEN.js');
            break;
          case '66c63f502b78911af098063d':
            configModule = await import('../../configs/stage1study2ESEN.js');
            break;
          default:
            configModule = await import('../../configs/stage1study2ENES.js');
            break;
        }
        setTasksConfig(configModule.default);
      } catch (error) {
        console.error('Error loading task configuration:', error);
      }
    };

    if (studyID) {
      loadTaskConfig();
    }
  }, [studyID, setTasksConfig]);

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
      navigate("/instruction");
    } else {
      setValidationError("You must agree before proceeding.");
    }
  };

  const getProficiencyLanguage = () => {
    return consentTextConfig["Master"]?.language || "Something went wrong please contact researcher";
  };

  const getEstimatedTime = () => {
    return consentTextConfig["Master"]?.time || "Something went wrong please contact researcher";
  };

  const renderConsentText = () => {
    const consentHTML = consentTextConfig["Master"]?.consentText || "Something went wrong please contact researcher";
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
              {renderConsentText()}

              {/* Adding a thick horizontal line to separate informed consent from questions */}
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
                  Proceed to Instructions
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
