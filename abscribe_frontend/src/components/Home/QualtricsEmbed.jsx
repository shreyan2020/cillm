import React from 'react';

const QualtricsEmbed = ({ taskID, prolificID }) => {
  const qualtricsURL = `https://tudelft.fra1.qualtrics.com/jfe/form/${taskID}?PROLIFIC_PID=${prolificID}`;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="Qualtrics Survey"
        src={qualtricsURL}
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default QualtricsEmbed;
