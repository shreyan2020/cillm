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

  const { prolificID, setProlificID, studyID, setStudyID } = useContext(TaskContext);
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
    // console.log('asasa', study_id)
    if (prolific_id) {
      setProlificID(prolific_id);
    }
    if (study_id) {
      setStudyID(study_id);
    }
    
  }, [location.search, setProlificID, setStudyID]);

  const saveParticipantInfo = async (participantData) => {
    try {
      const response = await apiClient.post("/save_participant_info", participantData);
      // console.log("Participant info saved:", response.data);
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
    return consentTextConfig[studyID]?.language || "Something went wrong please contact researcher";
  };

  const getEstimatedTime = () => {
    return consentTextConfig[studyID]?.time || "Something went wrong please contact researcher";
  };

  const renderConsentText = () => {
    const consentHTML = consentTextConfig[studyID]?.consentText || "Something went wrong please contact researcher";
    return <div dangerouslySetInnerHTML={{ __html: consentHTML }} />;
  };
// console.log(studyID, consentTextConfig)
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
                  <label htmlFor="proficiency" className="mb-2">
                    Language Proficiency {studyID === "66aca63c781c99be382101f6" ? "(English)" : "(Spanish)"}
                  </label>
                  <select
                    id="proficiency"
                    className="form-control"
                    value={studyID === "66aca63c781c99be382101f6" ? englishProficiency : spanishProficiency}
                    onChange={(e) => {
                      if (studyID === "66aca63c781c99be382101f6") {
                        setEnglishProficiency(e.target.value);
                      } else {
                        setSpanishProficiency(e.target.value);
                      }
                    }}
                    required
                  >
                    <option value="">Select your proficiency level</option>
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
