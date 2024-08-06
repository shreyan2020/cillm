import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "prismjs/themes/prism.css";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";
import { apiClient } from '../../services/abscribeAPI'; // Import apiClient

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
      console.log("Participant info saved:", response.data);
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
      navigate("/task");
    } else {
      setValidationError("You must agree before proceeding.");
    }
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="row mt-4">
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Consent Form</h2>
              <p>
                We are a group of researchers at the Technical University of Delft in The Netherlands. In this research project, we aim to investigate human behavior in LLM-augmented co-writing. As such, you are invited to participate in our research study.
              </p>
              
              <p>
                The following task is part of the research project described above. Upon accessing the web application, you will be presented with two tasks in two different languages, both pertaining to writing a persuasive text message for two charities using an AI-powered text editor. After each task, you will be asked to fill in a small questionnaire that relates to your experience with the editor.
              </p>
              
              <p>
                Completion of these tasks does not require any specific equipment. Your participation in this task is entirely voluntary, and you can withdraw at any time.
              </p>
              
              <p>
                We will collect your usage and your experience with the tool. This includes:
              </p>
              <ul>
                <li>Personal information: age and gender</li>
                <li>Language proficiency</li>
                <li>Usage data: keystrokes, interactions with the editor, and your final write-up (which may be used in future scientific tasks)</li>
                <li>Responses from the questionnaires</li>
              </ul>
              
              <p>
                We do not collect any data aside from the information described, and we will keep your information confidential to the best of our ability. All data is stored in a password-protected electronic format. Be aware that the data we gather with this task might be published in anonymized form later. Such an anonymized data set would include the answers you provide in this task but no personal information (e.g., your worker ID) so that the answers will not be traceable back to you.
              </p>    
              <p>
                By clicking “I consent” at the bottom of this page, you confirm that you have read, understood, and consent to the above information.
              </p>
              <p>
                Note: You can exit the task at any time. This will imply revoking your consent, and subsequently, all your data will be discarded from our databases.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
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
                
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                
                {studyID !== "C" && (
                  <div className="form-group">
                    <label htmlFor="proficiency">
                      Language Proficiency 
                      {studyID === "66aca63c781c99be382101f6" && " (English)"}
                      {studyID === "66aca69be884d495377c3f30" && " (Spanish)"}
                    </label>
                    <select
                      id="proficiency"
                      className="form-control"
                      value={studyID === "A" ? englishProficiency : spanishProficiency}
                      onChange={(e) => studyID === "A" ? setEnglishProficiency(e.target.value) : setSpanishProficiency(e.target.value)}
                      required
                    >
                      <option value="">Select your proficiency level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="native">Native</option>
                    </select>
                  </div>
                )}

                {studyID === "C" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="englishProficiency">English Proficiency</label>
                      <select
                        id="englishProficiency"
                        className="form-control"
                        value={englishProficiency}
                        onChange={(e) => setEnglishProficiency(e.target.value)}
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
                      <label htmlFor="spanishProficiency">Spanish Proficiency</label>
                      <select
                        id="spanishProficiency"
                        className="form-control"
                        value={spanishProficiency}
                        onChange={(e) => setSpanishProficiency(e.target.value)}
                        required
                      >
                        <option value="">Select your proficiency level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="native">Native</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="form-group">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    required
                  />
                  <label htmlFor="agree"> I Consent</label>
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
