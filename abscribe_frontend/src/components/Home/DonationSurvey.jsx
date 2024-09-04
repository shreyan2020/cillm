import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext';
import { apiClient } from '../../services/abscribeAPI';

const DonationSurvey = () => {
  const navigate = useNavigate();
  const { prolificID, studyID, taskID, tasksConfig } = useContext(TaskContext);
  const [textData, setTextData] = useState(null);
  const [currentStep, setCurrentStep] = useState('ad-display');
  const [responses, setResponses] = useState({
    donationAmount: '',
    emotionalAppeal: {},
    informationAwareness: {},
    behavioralIntentions: {},
    charity: '',
    charityFeedbackPositive: '',
    charityFeedbackNegative: '',
    adSource: '',
    adSourceReason: '', // New field to store the reason for ad source
    recipeUsed: [],
    // perceptionMission: {},
    // perceivedImpact: {},
    // personalIdentity: {},
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const errorRefs = useRef({});
  const textContainerRef = useRef(null); 

  const config = tasksConfig.config;

  useEffect(() => {
    const fetchText = async () => {
      try {
        // console.log('calling the method');
        const response = await apiClient.post("get_persuasive_text", {
          task_category: tasksConfig.config.language,
          prolific_id: prolificID,
        });
        // console.log('response from the method',response, task_category, prolific_id);
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


  useEffect(() => {
    if (textContainerRef.current) {
      const textHeight = textContainerRef.current.scrollHeight;
      textContainerRef.current.style.height = `${textHeight}px`; // Dynamically adjust height
    }
  }, [textData]); // Adjust the height when textData is updated


  const handleNextStep = () => {
    const errors = {};
    const errorMsg = config.labels.validationmessage;
    // Check the current step and validate accordingly
    if (currentStep.startsWith('post-questionnaire')) {
      const section = currentStep.split('-')[2]; // e.g., 'emotionalAppeal'
      const questions = config.questions[section].options;
      Object.keys(questions).forEach(key => {
        if (!responses[section][key]) {
          errors[section] = errors[section] || {};
          errors[section][key] = errorMsg;
          if (errorRefs.current[`${section}-${key}`]) {
            errorRefs.current[`${section}-${key}`].focus();
          }
        }
      });
    } else {
      switch (currentStep) {
        case 'feedback-positive':
          if (!responses.charityFeedbackPositive.trim()) {
            errors.charityFeedbackPositive = errorMsg;
            if (errorRefs.current['charityFeedbackPositive']) {
              errorRefs.current['charityFeedbackPositive'].focus();
            }
          }
          break;
        case 'feedback-negative':
          if (!responses.charityFeedbackNegative.trim()) {
            errors.charityFeedbackNegative = errorMsg;
            if (errorRefs.current['charityFeedbackNegative']) {
              errorRefs.current['charityFeedbackNegative'].focus();
            }
          }
          break;
        case 'adSource':
          if (!responses.adSource) {
            errors.adSource = errorMsg;
            if (errorRefs.current['adSource']) {
              // errorRefs.current['adSource'].focus();
            }
          }
          if (responses.adSource && !responses.adSourceReason.trim()) {
            errors.adSourceReason = errorMsg;
            if (errorRefs.current['adSourceReason']) {
              errorRefs.current['adSourceReason'].focus();
            }
          }
          break;
        case 'recipeUsed':
          if (responses.recipeUsed.length === 0) {
            errors.recipeUsed = errorMsg;
            if (errorRefs.current['recipeUsed']) {
              // errorRefs.current['recipeUsed'].focus();
            }
          }
          break;
        case 'attention-check':
          if (!responses.charity) {
            errors.charity = errorMsg;
            if (errorRefs.current['charity']) {
              // errorRefs.current['charity'].focus();
            }
          }
          break;
        default:
          break;
      }
    }


    if (Object.keys(errors).length === 0) {
      setValidationErrors({});
      // Proceed to next step
      setCurrentStep((prevStep) => {
        switch (prevStep) {
          case 'ad-display':
            return 'donation';
          case 'donation':
            return 'post-questionnaire-emotionalAppeal';
          case 'post-questionnaire-emotionalAppeal':
            return 'post-questionnaire-informationAwareness';
          // case 'post-questionnaire-perceptionMission':
            // return 'post-questionnaire-informationAwareness';
          case 'post-questionnaire-informationAwareness':
            return 'post-questionnaire-behavioralIntentions';
          // case 'post-questionnaire-perceivedImpact':
            // return 'post-questionnaire-personalIdentity';
          // case 'post-questionnaire-personalIdentity':
            // return 'post-questionnaire-behavioralIntentions';
          case 'post-questionnaire-behavioralIntentions':
            return 'attention-check';
          case 'attention-check':
            return 'feedback-positive';
          case 'feedback-positive':
            return 'feedback-negative';
          case 'feedback-negative':
            return 'adSource';
          case 'adSource':
            return 'recipeUsed';
          case 'recipeUsed':
            return 'final-submit';
          default:
            return 'final-submit';
        }
      });
    } else {
      setValidationErrors(errors);
    }
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

  const handleLikertChange = (category, key, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [category]: {
        ...prevResponses[category],
        [key]: value,
      },
    }));
  };

  const handleDonationSubmit = (event) => {
    event.preventDefault();
    const donationValue = parseFloat(responses.donationAmount);
    if (!responses.donationAmount || isNaN(donationValue) || donationValue < 0) {
      setValidationErrors({ donationAmount: "Please enter a valid donation amount." });
      errorRefs.current['donationAmount'].focus();
    } else {
      setValidationErrors({});
      handleNextStep();
    }
  };

  const handleFinalSubmit = async (event) => {
    event.preventDefault();
  
    const errors = {};
    
    // Validate that at least one `recipeUsed` option is selected
    if (responses.recipeUsed.length === 0) {
      errors.recipeUsed = "Please select at least one option.";
    }
  
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;  // Prevent form submission if there are validation errors
    }
  
    // No validation errors, proceed with submission
    const surveyData = {
      prolific_id: prolificID,
      study_id: studyID,
      task_id: taskID,
      document_id: textData._id,
      responses,
    };
  
    try {
      // apiClient.post("/log_survey", surveyData);
      const response = await apiClient.post("/log_survey", surveyData);
      if (response.status === 200 && response.data.redirectCode) {
        window.location.href = `https://app.prolific.com/submissions/complete?cc=${response.data.redirectCode}`;
      }
      else {
        console.error("Error in backend response:", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };
  

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="survey-container p-4 bg-light" style={{
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '80%',
      height: 'auto',
      margin: 'auto',
      padding: '2rem',
      boxSizing: 'border-box',
      overflow: 'auto',
    }}>
      <div className="card shadow-sm p-4">
        {currentStep !== 'ad-display' && (
          <div ref={textContainerRef}  className="text-box mb-4 p-4 border rounded bg-light"
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
              fontSize: '1.2rem',
              lineHeight: '1.6',
              width: '100%',
              maxWidth: '80vw',
              margin: 'auto',
              textAlign: 'center',
            }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {textData?.content}
            </pre>
          </div>
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
              ref={(el) => errorRefs.current['donationAmount'] = el}
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

        {['emotionalAppeal', 'perceptionMission', 'informationAwareness', 'perceivedImpact', 'personalIdentity', 'behavioralIntentions'].map((section, idx) => (
          currentStep === `post-questionnaire-${section}` && (
            <div key={idx}>
              {/* <h4 className="mb-4">{config.questions[section].header}</h4> */}
              {Object.keys(config.questions[section].options).map((key) => (
                <div key={key} className="form-group mb-4">
                  <label className="form-label">{config.questions[section].options[key]}</label>
                  <div className="likert-scale d-flex justify-content-between">
                    {config.likertScale.map((option, idx) => (
                      <label key={idx} className="likert-option me-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          name={`${section}-${key}`}
                          value={option}
                          checked={responses[section][key] === option}
                          onChange={() => handleLikertChange(section, key, option)}
                          ref={(el) => errorRefs.current[`${section}-${key}`] = el}
                        />
                        <span className="ms-2">{option}</span>
                      </label>
                    ))}
                  </div>
                  {validationErrors[section]?.[key] && (
                    <div className="text-danger mt-2">
                      <i className="fas fa-exclamation-triangle"></i> {validationErrors[section][key]}
                    </div>
                  )}
                </div>
              ))}
              <div className="text-center">
                <Button className="mt-4" variant="primary" size="lg" onClick={handleNextStep}>
                  Next
                </Button>
              </div>
            </div>
          )
        ))}

{currentStep === 'attention-check' && (
  <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
    <div className="form-group mb-4">
      <label className="form-label">{config.questions.charity.header}</label>
      <div className="d-flex flex-column">
        {config.questions.charity.options.map((option, index) => (
          <label key={index} className="form-check">
            <input
              type="radio"
              name="charity"
              value={option}
              className="form-check-input"
              checked={responses.charity === option}
              onChange={() => handleInputChange('charity', option)}
              ref={(el) => errorRefs.current['charity'] = el}
            /> {option}
          </label>
        ))}
      </div>
      {validationErrors.charity && (
        <div className="text-danger mt-2">
          <i className="fas fa-exclamation-triangle"></i> {validationErrors.charity}
        </div>
      )}
    </div>
    <div className="text-center">
      <Button className="mt-4" variant="primary" size="lg" type="submit">
        Next
      </Button>
    </div>
  </form>
)}



        {/* Positive Feedback */}
        {currentStep === 'feedback-positive' && (
           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            <div className="form-group mb-4">
              <label className="form-label">{config.questions.feedbackPositive}</label>
              <textarea
                className="form-control"
                rows="3"
                value={responses.charityFeedbackPositive}
                onChange={(e) => handleInputChange('charityFeedbackPositive', e.target.value)}
                ref={(el) => errorRefs.current['charityFeedbackPositive'] = el}
              />
              {validationErrors.charityFeedbackPositive && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.charityFeedbackPositive}
                </div>
              )}
            </div>
            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" type="submit">
                Next
              </Button>
            </div>
          </form>
        )}

        {/* Negative Feedback */}
        {currentStep === 'feedback-negative' && (
           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            <div className="form-group mb-4">
              <label className="form-label">{config.questions.feedbackNegative}</label>
              <textarea
                className="form-control"
                rows="3"
                value={responses.charityFeedbackNegative}
                onChange={(e) => handleInputChange('charityFeedbackNegative', e.target.value)}
                ref={(el) => errorRefs.current['charityFeedbackNegative'] = el}
              />
              {validationErrors.charityFeedbackNegative && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.charityFeedbackNegative}
                </div>
              )}
            </div>
            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" type="submit">
                Next
              </Button>
            </div>
          </form>
        )}

        {/* Ad Source */}
        {currentStep === 'adSource' && (
           <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }}>
            <div className="form-group mb-4">
              <label className="form-label">{config.questions.adSource.header}</label>
              <div className="d-flex flex-column">
                {Object.keys(config.questions.adSource.options).map(key => (
                  <label key={key} className="form-check">
                    <input
                      type="radio"
                      name="adSource"
                      value={key}
                      className="form-check-input"
                      checked={responses.adSource === key}
                      onChange={() => handleOptionChange('adSource', key)}
                      ref={(el) => errorRefs.current['adSource'] = el}
                    /> {config.questions.adSource.options[key]}
                  </label>
                ))}
              </div>
              {validationErrors.adSource && (
                <div className="text-danger mt-2">
                  <i className="fas fa-exclamation-triangle"></i> {validationErrors.adSource}
                </div>
              )}  
            </div>
             {/* Conditional question based on adSource */}
             {responses.adSource && (
              <div className="form-group mb-4">
              <label className="form-label">
                  {`${config.questions.adSource.headerReason} ${config.questions.adSource.options[responses.adSource]}?`}
                  </label>

                <textarea
                  className="form-control"
                  rows="3"
                  value={responses.adSourceReason}
                  onChange={(e) => handleInputChange('adSourceReason', e.target.value)}
                  ref={(el) => errorRefs.current['adSourceReason'] = el}
                />
                {validationErrors.adSourceReason && (
                  <div className="text-danger mt-2">
                    <i className="fas fa-exclamation-triangle"></i> {validationErrors.adSourceReason}
                  </div>
                )}
              </div>
            )}
            <div className="text-center">
              <Button className="mt-4" variant="primary" size="lg" type="submit">
                Next
              </Button>
            </div>
          </form>
        )}

        {/* Recipe Used */}
        {currentStep === 'recipeUsed' && (
  <form onSubmit={handleFinalSubmit}>
    <div className="form-group mb-4">
      <label className="form-label">{config.questions.recipeUsed.header}</label>
      <div className="d-flex flex-column">
        {Object.entries(config.questions.recipeUsed.options).map(([key, option], index) => (
          <label key={index} className="form-check">
            <input
              type="checkbox"
              name="recipeUsed"
              value={key}
              className="form-check-input"
              checked={responses.recipeUsed.includes(key)}
              onChange={() => handleOptionChange('recipeUsed', key)}
              ref={(el) => errorRefs.current['recipeUsed'] = el}
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
