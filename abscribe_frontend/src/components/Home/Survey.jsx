import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../../scss/survey.scss';
import { apiClient } from '../../services/abscribeAPI';
import { TaskContext } from '../../context/TaskContext';
import surveyConfig from '../../configs/surveyConfig'; // Import the new config file

const Survey = () => {
  const navigate = useNavigate();
  const { prolificID, taskID, studyID } = useContext(TaskContext);

  const config = surveyConfig[studyID] || surveyConfig.default;

  const [responses, setResponses] = useState({
    usefulness: {},
    ownership: {},
    collaboration: {},
    aiCapabilities: {},
    notApplicable: {}  // State to track "Not Applicable" selections
  });

  const [validationErrors, setValidationErrors] = useState({
    usefulness: {},
    ownership: {},
    collaboration: {},
    aiCapabilities: {},
  });

  const handleChange = (block, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [block]: {
        ...prevResponses[block],
        [question]: value,
      },
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [block]: {
        ...prevErrors[block],
        [question]: null,  // Clear validation error when a value is selected
      },
    }));
  };

  const handleNotApplicableChange = (question) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      notApplicable: {
        ...prevResponses.notApplicable,
        [question]: !prevResponses.notApplicable[question],
      },
      usefulness: {
        ...prevResponses.usefulness,
        [question]: prevResponses.notApplicable[question] ? prevResponses.usefulness[question] : "NA",
      }
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      usefulness: {
        ...prevErrors.usefulness,
        [question]: null,  // Clear validation error when "Not Applicable" is selected
      },
    }));
  };

  const handleRadioChange = (block, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [block]: {
        ...prevResponses[block],
        [question]: value,
      },
    }));
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [block]: {
        ...prevErrors[block],
        [question]: null,  // Clear validation error when a value is selected
      },
    }));
  };

  const validateFields = () => {
    const errors = {
      usefulness: {},
      ownership: {},
      collaboration: {},
      aiCapabilities: {},
    };

    // Validate Usefulness of Features
    config.questions.usefulness.forEach((feature) => {
      if (!responses.usefulness[feature] && !responses.notApplicable[feature]) {
        errors.usefulness[feature] = 'This field is required';
      }
    });

    // Validate Ownership
    config.questions.ownership.forEach((statement) => {
      if (!responses.ownership[statement]) {
        errors.ownership[statement] = 'This field is required';
      }
    });

    // Validate Collaboration
    config.questions.collaboration.forEach((statement) => {
      if (!responses.collaboration[statement]) {
        errors.collaboration[statement] = 'This field is required';
      }
    });

    // Validate AI Writing Assistant Capabilities
    config.questions.aiCapabilities.forEach((statement) => {
      if (!responses.aiCapabilities[statement]) {
        errors.aiCapabilities[statement] = 'This field is required';
      }
    });

    setValidationErrors(errors);

    // Return true if there are no errors
    return !Object.values(errors.usefulness).some(error => error) &&
           !Object.values(errors.ownership).some(error => error) &&
           !Object.values(errors.collaboration).some(error => error) &&
           !Object.values(errors.aiCapabilities).some(error => error);
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    console.log('Survey responses:', responses);
    try {
      const surveyData = {
        prolific_id: prolificID,
        study_id: studyID,
        task_id: taskID, 
        responses: responses,
      };

      await apiClient.post("/log_survey", surveyData);
      console.log('Survey responses saved successfully');
      navigate("/task");
    } catch (error) {
      console.error('Failed to save survey responses:', error);
    }
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>Survey</h1>
      </div>

      {/* Usefulness of Features */}
      <div className="survey-block">
        <h2>{config.headers.usefulness}</h2>
        {config.questions.usefulness.map((feature, index) => (
          <div key={index} className="survey-question">
            <label>{feature}</label>
            <div className="survey-input">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={responses.notApplicable[feature] ? "NA" : responses.usefulness[feature] || 0}
                onChange={(e) => handleChange('usefulness', feature, e.target.value)}
                disabled={responses.notApplicable[feature]}  // Disable slider if "Not Applicable" is checked
              />
              <span>{responses.notApplicable[feature] ? 'NA' : responses.usefulness[feature] || 0}</span>
              <label>
                <input
                  type="checkbox"
                  checked={responses.notApplicable[feature] || false}
                  onChange={() => handleNotApplicableChange(feature)}
                />
                Not Applicable
              </label>
            </div>
            {validationErrors.usefulness[feature] && (
              <div className="error">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.usefulness[feature]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Ownership */}
      <div className="survey-block">
        <h2>{config.headers.ownership}</h2>
        {config.questions.ownership.map((statement, index) => (
          <div key={index} className="survey-question">
            <label>{statement}</label>
            <div className="likert-scale">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option">
                  <input
                    type="radio"
                    name={`ownership-${index}`}
                    value={option}
                    checked={responses.ownership[statement] === option}
                    onChange={() => handleRadioChange('ownership', statement, option)}
                  />
                  <span className="likert-label">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.ownership[statement] && (
              <div className="error">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.ownership[statement]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Collaboration */}
      <div className="survey-block">
        <h2>{config.headers.collaboration}</h2>
        {config.questions.collaboration.map((statement, index) => (
          <div key={index} className="survey-question">
            <label>{statement}</label>
            <div className="likert-scale">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option">
                  <input
                    type="radio"
                    name={`collaboration-${index}`}
                    value={option}
                    checked={responses.collaboration[statement] === option}
                    onChange={() => handleRadioChange('collaboration', statement, option)}
                  />
                  <span className="likert-label">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.collaboration[statement] && (
              <div className="error">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.collaboration[statement]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Writing Assistant Capabilities */}
      <div className="survey-block">
        <h2>{config.headers.aiCapabilities}</h2>
        {config.questions.aiCapabilities.map((statement, index) => (
          <div key={index} className="survey-question">
            <label>{statement}</label>
            <div className="likert-scale">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option">
                  <input
                    type="radio"
                    name={`aiCapabilities-${index}`}
                    value={option}
                    checked={responses.aiCapabilities[statement] === option}
                    onChange={() => handleRadioChange('aiCapabilities', statement, option)}
                  />
                  <span className="likert-label">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.aiCapabilities[statement] && (
              <div className="error">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.aiCapabilities[statement]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="survey-submit">
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Survey;
