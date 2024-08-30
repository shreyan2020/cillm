import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext';
import { apiClient } from '../../services/abscribeAPI';

const DonationSurvey = () => {
  const navigate = useNavigate();
  const { prolificID, studyID, taskID, tasksConfig } = useContext(TaskContext);
  const [textData, setTextData] = useState(null);
  const [currentStep, setCurrentStep] = useState('pre-questionnaire');
  const [responses, setResponses] = useState({
    familiarity: '',
    donationAmount: '',
    charityFeedback: '',
    adSource: '',
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

  const handleNextStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case 'pre-questionnaire':
          return 'ad-display';
        case 'ad-display':
          return 'donation';
        case 'donation':
          return 'post-questionnaire';
        default:
          return 'post-questionnaire';
      }
    });
  };

  const handleInputChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleOptionChange = (key, option) => {
    setResponses((prevResponses) => {
      if (key === 'recipeUsed') {
        const newRecipeUsed = prevResponses.recipeUsed.includes(option)
          ? prevResponses.recipeUsed.filter((item) => item !== option)
          : [...prevResponses.recipeUsed, option];
        return { ...prevResponses, recipeUsed: newRecipeUsed };
      }
      return { ...prevResponses, [key]: option };
    });
  };

  const validateAndProceed = (currentKey) => {
    const errors = {};

    if (!responses[currentKey].trim()) {
      errors[currentKey] = `Please provide an answer for ${config.questions[currentKey]}`;
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    handleNextStep();
    return true;
  };

  const handleDonationSubmit = (event) => {
    event.preventDefault();
    const donationValue = parseFloat(responses.donationAmount);
    if (!responses.donationAmount || isNaN(donationValue) || donationValue < 0) {
      setValidationErrors({ donationAmount: "Please enter a valid donation amount." });
    } else {
      setValidationErrors({});
      handleNextStep();
    }
  };

  const handleSurveySubmit = async (event) => {
    event.preventDefault();

    const surveyData = {
      prolific_id: prolificID,
      study_id: studyID,
      task_id: taskID,
      document_id: textData._id,
      responses,
    };

    try {
      await apiClient.post("/log_survey", surveyData);
      window.location.href = `https://app.prolific.com/submissions/complete?cc=${tasksConfig.redirectCode}`;
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="survey-container p-4 bg-light" style={{
      maxWidth: '90vw',  // Adjust to make it occupy more width
      maxHeight: '90vh', // Adjust to make it occupy more height
      width: '80%',     // Ensure it takes up full available width
      height: 'auto',    // Allow it to scale with content, or set to '100%' for full height
      margin: 'auto',    // Centering the container
      padding: '2rem',   // Padding for internal spacing
      boxSizing: 'border-box', // Ensure padding is included in the width/height calculation
      overflow: 'auto',  // Handle overflow for smaller screens
    }}>
      <div className="card shadow-sm p-4">
        {currentStep !== 'pre-questionnaire' && (
         <div className="text-box mb-4 p-4 border rounded bg-light" 
         style={{
            maxHeight: '60vh',  // Increased height for more text display area
            overflowY: 'auto',
            fontSize: '1.2rem',  // Adjust font size for better readability
            lineHeight: '1.6',
            width: '100%',  // Occupy full width
            maxWidth: '80vw',  // Ensure the box is large but not too wide
            margin: 'auto',  // Centering the box
            textAlign: 'center',  // Center the text inside the box
          }}>
      {/* Displaying plain text with newlines */}
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {textData?.content}
      </pre>
    </div>
        )}

        {currentStep === 'pre-questionnaire' && (
          <>
            <h4 className="mb-4">How familiar are you with WWF charity?</h4>
            <input
              type="text"
              className="form-control"
              value={responses.familiarity}
              onChange={(e) => handleInputChange('familiarity', e.target.value)}
            />
            {validationErrors.familiarity && (
              <div className="text-danger mt-2">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.familiarity}
              </div>
            )}
            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" onClick={() => validateAndProceed('familiarity')}>
                Next
              </Button>
            </div>
          </>
        )}

        {currentStep === 'ad-display' && (
          <>
            <h2 className="h4 mb-4 text-center">{config.labels.instruction}</h2>
            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" onClick={handleNextStep}>
                Proceed to Donation
              </Button>
            </div>
          </>
        )}

        {currentStep === 'donation' && (
          <form onSubmit={handleDonationSubmit}>
            <h4 className="mb-4">{config.questions.donation}</h4>
            <input
              type="number"
              className="form-control"
              value={responses.donationAmount}
              onChange={(e) => handleInputChange('donationAmount', e.target.value)}
              min="0"
              step="0.1"
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
        )}

        {currentStep === 'post-questionnaire' && (
          <form onSubmit={handleSurveySubmit}>
            <div className="form-group mb-4">
              <label className="form-label">{config.questions.feedback}</label>
              <textarea
                className="form-control"
                rows="3"
                value={responses.charityFeedback}
                onChange={(e) => handleInputChange('charityFeedback', e.target.value)}
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
                    onChange={() => handleOptionChange('adSource', 'AI')}
                  /> {config.options.adSource.ai}
                </label>
                <label className="form-check">
                  <input
                    type="radio"
                    name="adSource"
                    value="Human"
                    className="form-check-input"
                    checked={responses.adSource === "Human"}
                    onChange={() => handleOptionChange('adSource', 'Human')}
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
                      onChange={() => handleOptionChange('recipeUsed', option)}
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
