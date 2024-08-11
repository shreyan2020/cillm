import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import '../../scss/survey.scss';
import { apiClient } from '../../services/abscribeAPI';
import { TaskContext } from '../../context/TaskContext';

const Survey = () => {
  const navigate = useNavigate();
  const { prolificID, taskID, studyID } = useContext(TaskContext);

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
    ['Variation - Gain Framing with Anecdotal Information',
      'Variation - Loss Framing with Anecdotal Information',
      'Variation - Gain Framing with Statistics',
      'Variation - Loss Framing with Statistics',
      'Variation - Short-term Temporal Framing',
      'Variation - Long-term Temporal Framing',
      '@ai to Generate New Texts',
      'Create Continuation'].forEach((feature) => {
        if (!responses.usefulness[feature] && !responses.notApplicable[feature]) {
          errors.usefulness[feature] = 'This field is required';
        }
    });

    // Validate Ownership
    ['I feel that I have contributed to the content',
      'I would be willing to publicly share the content I wrote, including my name',
      'I would fully claim ownership of the content I wrote'].forEach((statement) => {
        if (!responses.ownership[statement]) {
          errors.ownership[statement] = 'This field is required';
        }
    });

    // Validate Collaboration
    ['Do you think the suggestions you received contributed to the fluency of the resultant text?',
      'Did the suggestions help you come up with new ideas?',
      'Do you feel that you would have written a better text if you wrote it alone?'].forEach((statement) => {
        if (!responses.collaboration[statement]) {
          errors.collaboration[statement] = 'This field is required';
        }
    });

    // Validate AI Writing Assistant Capabilities
    ['Do you think the system was competent in writing?',
      'Do you think the system was capable of writing creative texts?',
      'Do you think the system was capable of writing persuasive texts?',
      'Do you think the system understood what you were trying to write?'].forEach((statement) => {
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
      // console.log(surveyData);

      await apiClient.post("/log_survey", surveyData);
      console.log('Survey responses saved successfully');
      navigate("/task");
      // Additional actions on success (if needed)
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
        <h2>Usefulness of Features- Select Not applicable if you have not used the feature. To rate a feature 0, drag it right then drag it back to 0</h2>
        {['Variation - Gain Framing with Anecdotal Information',
          'Variation - Loss Framing with Anecdotal Information',
          'Variation - Gain Framing with Statistics',
          'Variation - Loss Framing with Statistics',
          'Variation - Short-term Temporal Framing',
          'Variation - Long-term Temporal Framing',
          '@ai to Generate New Texts',
          'Create Continuation'].map((feature, index) => (
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
        <h2>Ownership</h2>
        {['I feel that I have contributed to the content',
          'I would be willing to publicly share the content I wrote, including my name',
          'I would fully claim ownership of the content I wrote'].map((statement, index) => (
            <div key={index} className="survey-question">
              <label>{statement}</label>
              <div className="likert-scale">
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, idx) => (
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
        <h2>Collaboration</h2>
        {['Do you think the suggestions you received contributed to the fluency of the resultant text?',
          'Did the suggestions help you come up with new ideas?',
          'Do you feel that you would have written a better text if you wrote it alone?'].map((statement, index) => (
            <div key={index} className="survey-question">
              <label>{statement}</label>
              <div className="likert-scale">
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, idx) => (
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
        <h2>AI Writing Assistant Capabilities</h2>
        {['Do you think the system was competent in writing?',
          'Do you think the system was capable of writing creative texts?',
          'Do you think the system was capable of writing persuasive texts?',
          'Do you think the system understood what you were trying to write?'].map((statement, index) => (
            <div key={index} className="survey-question">
              <label>{statement}</label>
              <div className="likert-scale">
                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, idx) => (
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
