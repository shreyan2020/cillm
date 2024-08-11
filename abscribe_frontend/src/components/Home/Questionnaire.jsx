import React, { useState } from 'react';

const Questionnaire = () => {
  // State to hold the responses
  const [responses, setResponses] = useState({
    usefulness: {},
    ownership: {},
    collaboration: {},
    aiCapabilities: {},
  });

  // Function to handle changes in the survey inputs
  const handleChange = (block, question, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [block]: {
        ...prevResponses[block],
        [question]: value,
      },
    }));
  };

  return (
    <div>
      <h1>Survey</h1>

      {/* Usefulness of Features */}
      <div>
        <h2>Usefulness of Features</h2>
        {['Variation - Gain Framing with Anecdotal Information',
          'Variation - Loss Framing with Anecdotal Information',
          'Variation - Gain Framing with Statistics',
          'Variation - Loss Framing with Statistics',
          'Variation - Short-term Temporal Framing',
          'Variation - Long-term Temporal Framing',
          '@ai to Generate New Texts',
          'Create Continuation'].map((feature, index) => (
            <div key={index}>
              <label>{feature}</label>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={responses.usefulness[feature] || 0}
                onChange={(e) => handleChange('usefulness', feature, e.target.value)}
              />
              <span>{responses.usefulness[feature] || 0}</span>
            </div>
        ))}
      </div>

      {/* Ownership */}
      <div>
        <h2>Ownership</h2>
        {['I feel that I have contributed to the content',
          'I would be willing to publicly share the content I wrote, including my name',
          'I would fully claim ownership of the content I wrote'].map((statement, index) => (
            <div key={index}>
              <label>{statement}</label>
              <select
                value={responses.ownership[statement] || 1}
                onChange={(e) => handleChange('ownership', statement, e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neither Agree nor Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'][num - 1]}
                  </option>
                ))}
              </select>
            </div>
        ))}
      </div>

      {/* Collaboration */}
      <div>
        <h2>Collaboration</h2>
        {['Do you think the suggestions you received contributed to the fluency of the resultant text?',
          'Did the suggestions help you come up with new ideas?',
          'Do you feel that you would have written a better text if you wrote it alone?'].map((statement, index) => (
            <div key={index}>
              <label>{statement}</label>
              <select
                value={responses.collaboration[statement] || 1}
                onChange={(e) => handleChange('collaboration', statement, e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neither Agree nor Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'][num - 1]}
                  </option>
                ))}
              </select>
            </div>
        ))}
      </div>

      {/* AI Writing Assistant Capabilities */}
      <div>
        <h2>AI Writing Assistant Capabilities</h2>
        {['Do you think the system was competent in writing?',
          'Do you think the system was capable of writing creative texts?',
          'Do you think the system was capable of writing persuasive texts?',
          'Do you think the system understood what you were trying to write?'].map((statement, index) => (
            <div key={index}>
              <label>{statement}</label>
              <select
                value={responses.aiCapabilities[statement] || 1}
                onChange={(e) => handleChange('aiCapabilities', statement, e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <option key={num} value={num}>
                    {['Strongly Disagree', 'Disagree', 'Somewhat Disagree', 'Neither Agree nor Disagree', 'Somewhat Agree', 'Agree', 'Strongly Agree'][num - 1]}
                  </option>
                ))}
              </select>
            </div>
        ))}
      </div>

      {/* Add a submit button */}
      <button onClick={() => console.log('Survey responses:', responses)}>
        Submit
      </button>
    </div>
  );
};

export default Questionnaire;
