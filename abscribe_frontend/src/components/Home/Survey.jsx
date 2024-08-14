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
    <div className="survey-container p-4 bg-light">
  <div className="survey-header mb-5">
  <h1 className="mb-4 text-primary text-center">Usefulness of Features</h1>
  <h2 className="mb-4 h4 text-secondary text-start">Instructions</h2>
  <div className="instructions text-start mb-4">
    <div dangerouslySetInnerHTML={{ __html: config.headers.usefulness }} />
  </div>
</div>

  
      {/* Usefulness of Features */}
      <div className="survey-block mb-5">
        {/* <h3 className="h5 mb-4">{config.headers.usefulness}</h3> */}
        {config.questions.usefulness.map((feature, index) => (
          <div key={index} className="survey-question mb-4">
            <label className="form-label">{feature}</label>
            <div className="d-flex align-items-center">
              <input
                type="range"
                className="form-range me-3"
                min="0"
                max="100"
                step="1"
                value={responses.notApplicable[feature] ? "NA" : responses.usefulness[feature] || 0}
                onChange={(e) => handleChange('usefulness', feature, e.target.value)}
                disabled={responses.notApplicable[feature]}  // Disable slider if "Not Applicable" is checked
              />
              <span className="ms-3">{responses.notApplicable[feature] ? 'NA' : responses.usefulness[feature] || 0}</span>
              <label className="form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={responses.notApplicable[feature] || false}
                  onChange={() => handleNotApplicableChange(feature)}
                />
                Not Applicable
              </label>
            </div>
            {validationErrors.usefulness[feature] && (
              <div className="text-danger mt-2">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.usefulness[feature]}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Ownership */}
      <div className="survey-block mb-5">
     
      <h1 className="mb-4 text-primary text-center">{config.headers.ownership}</h1>
        {config.questions.ownership.map((statement, index) => (
          <div key={index} className="survey-question mb-4">
            <label className="form-label">{statement}</label>
            <div className="likert-scale d-flex justify-content-between">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`ownership-${index}`}
                    value={option}
                    checked={responses.ownership[statement] === option}
                    onChange={() => handleRadioChange('ownership', statement, option)}
                  />
                  <span className="ms-2">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.ownership[statement] && (
              <div className="text-danger mt-2">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.ownership[statement]}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Collaboration */}
      <div className="survey-block mb-5">
      <h1 className="mb-4 text-primary text-center">{config.headers.collaboration}</h1>
        {config.questions.collaboration.map((statement, index) => (
          <div key={index} className="survey-question mb-4">
            <label className="form-label">{statement}</label>
            <div className="likert-scale d-flex justify-content-between">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`collaboration-${index}`}
                    value={option}
                    checked={responses.collaboration[statement] === option}
                    onChange={() => handleRadioChange('collaboration', statement, option)}
                  />
                  <span className="ms-2">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.collaboration[statement] && (
              <div className="text-danger mt-2">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.collaboration[statement]}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* AI Writing Assistant Capabilities */}
      <div className="survey-block mb-5">
      <h1 className="mb-4 text-primary text-center">{config.headers.aiCapabilities}</h1>
        {/* <h3 className="h5 mb-4">{config.headers.aiCapabilities}</h3> */}
        {config.questions.aiCapabilities.map((statement, index) => (
          <div key={index} className="survey-question mb-4">
            <label className="form-label">{statement}</label>
            <div className="likert-scale d-flex justify-content-between">
              {config.likertScale.map((option, idx) => (
                <label key={idx} className="likert-option me-3">
                  <input
                    type="radio"
                    className="form-check-input"
                    name={`aiCapabilities-${index}`}
                    value={option}
                    checked={responses.aiCapabilities[statement] === option}
                    onChange={() => handleRadioChange('aiCapabilities', statement, option)}
                  />
                  <span className="ms-2">{option}</span>
                </label>
              ))}
            </div>
            {validationErrors.aiCapabilities[statement] && (
              <div className="text-danger mt-2">
                <i className="fas fa-exclamation-triangle"></i> {validationErrors.aiCapabilities[statement]}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Submit Button */}
      <div className="text-center">
        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
  
};

export default Survey;
