import React from 'react';

const QualtricsEmbed = ({ taskId }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        title="Qualtrics Survey"
        src="https://tudelft.fra1.qualtrics.com/jfe/form/SV_6lGueSfofYMoSgu"
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default QualtricsEmbed;
