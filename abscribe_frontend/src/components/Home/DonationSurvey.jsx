import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext';
import { apiClient } from '../../services/abscribeAPI';

const DonationSurvey = () => {
  const navigate = useNavigate();
  const { prolificID, studyID, taskID, tasksConfig } = useContext(TaskContext);
  const [textData, setTextData] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);
  const [responses, setResponses] = useState({
    donationAmount: '',
    charityFeedback: "",
    adSource: "",
    recipeUsed: [],
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const config = tasksConfig.config;

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await apiClient.post("get_persuasive_text", {
          task_category: tasksConfig.config.language,
          prolific_id: prolificID,
        });
        if (response.status === 200) {
          setTextData(response.data);
          setLoading(false);
        } else {
          console.error("Error fetching text:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching text:", error);
      }
    };

    fetchText();
  }, [taskID, prolificID]);

  const handleDonationSubmit = (event) => {
    event.preventDefault();
     // Validate the donation amount
     const donationValue = parseFloat(responses.donationAmount);
     if (!responses.donationAmount || isNaN(donationValue) || donationValue < 0) {
       setValidationErrors({ donationAmount: "Please enter a valid donation amount." });
       return;
     } else {
       setValidationErrors({});
       setShowSurvey(true);
     }
   };
 

  const handleSurveySubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!responses.charityFeedback.trim()) {
      errors.charityFeedback = config.questions.feedback;
    }

    if (!responses.adSource) {
      errors.adSource = config.questions.adSource;
    }

    if (!responses.recipeUsed.length) {
      errors.recipeUsed = config.questions.recipeUsed;
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      const surveyData = {
        prolific_id: prolificID,
        study_id: studyID,
        task_id: taskID,
        document_id: textData._id,
        responses,  // Includes donationAmount now
      };

      try {
        await apiClient.post("/log_survey", surveyData);
       // navigate("https://app.prolific.com/researcher/get-started");
       window.location.href = `https://app.prolific.com/submissions/complete?cc=${tasksConfig.redirectCode}`;
      } catch (error) {
        console.error("Error submitting survey:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="survey-container p-4 bg-light">
      <div className="card shadow-sm p-4">
        {!showSurvey ? (
          <>
            <h2 className="h4 mb-4 text-center">{config.labels.instruction}</h2>
            <div className="text-box mb-4 p-3 border rounded bg-light">
              {textData?.plain_text}
            </div>
            <form onSubmit={handleDonationSubmit}>
              <h4 className="mb-4">{config.questions.donation}</h4>
              <input
                type="number"
                className="form-control"
                value={responses.donationAmount}
                onChange={(e) => setResponses({ ...responses, donationAmount: e.target.value })}
                min="0"
                max="1.5"
              />
              {validationErrors.donationAmount && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.donationAmount}
                </div>
              )}
              <div className="text-center">
                <Button className="mt-4" variant="primary" size="lg" type="submit">
                  {config.labels.submit}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <form onSubmit={handleSurveySubmit}>
            <div className="form-group mb-4">
              <label className="form-label">{config.questions.feedback}</label>
              <textarea
                className="form-control"
                rows="3"
                value={responses.charityFeedback}
                onChange={(e) => setResponses({ ...responses, charityFeedback: e.target.value })}
              />
              {validationErrors.charityFeedback && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.charityFeedback}
                </div>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">{config.questions.adSource}</label>
              <div className="d-flex flex-column">
                <label className="form-check">
                  <input
                    type="radio"
                    name="adSource"
                    value="AI"
                    className="form-check-input"
                    checked={responses.adSource === "AI"}
                    onChange={() => setResponses({ ...responses, adSource: "AI" })}
                  /> {config.options.adSource.ai}
                </label>
                <label className="form-check">
                  <input
                    type="radio"
                    name="adSource"
                    value="Human"
                    className="form-check-input"
                    checked={responses.adSource === "Human"}
                    onChange={() => setResponses({ ...responses, adSource: "Human" })}
                  /> {config.options.adSource.human}
                </label>
              </div>
              {validationErrors.adSource && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.adSource}
                </div>
              )}
            </div>

            <div className="form-group mb-4">
              <label className="form-label">{config.questions.recipeUsed}</label>
              <div className="d-flex flex-column">
                {config.options.recipeUsed.map((option, index) => (
                  <label key={index} className="form-check">
                    <input
                      type="checkbox"
                      name="recipeUsed"
                      value={option}
                      className="form-check-input"
                      checked={responses.recipeUsed.includes(option)}
                      onChange={() => {
                        const newRecipeUsed = responses.recipeUsed.includes(option)
                          ? responses.recipeUsed.filter((r) => r !== option)
                          : [...responses.recipeUsed, option];
                        setResponses({ ...responses, recipeUsed: newRecipeUsed });
                      }}
                    /> {option}
                  </label>
                ))}
              </div>
              {validationErrors.recipeUsed && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.recipeUsed}
                </div>
              )}
            </div>

            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" type="submit">
                {config.labels.submit}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DonationSurvey;
