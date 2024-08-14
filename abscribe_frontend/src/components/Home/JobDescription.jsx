import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext'; // Import TaskContext
import consentTextConfig from '../../configs/consentTextConfig'; // Import config file
import '../../scss/job-description.scss'; // Import CSS for styling

const JobDescription = ({ showButton = true }) => {
  const navigate = useNavigate();
  const { studyID } = useContext(TaskContext); // Get studyID from context

  const handleProceedClick = () => {
    navigate('/task');
  };

  const getProficiencyLanguage = () => {
    return consentTextConfig[studyID]?.language || "consentTextConfig.default.language";
  };

  const renderJobDescription = () => {
    const jobDescription = consentTextConfig[studyID]?.jobDescription || "consentTextConfig.default.jobDescription";

    return (
      <>
        <h2 className="card-title">{jobDescription.headers.taskDetails}</h2>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.taskDetails }} />

        <h3 className="card-subtitle mb-3">{jobDescription.headers.eligibilityCriteria}</h3>
        <ul dangerouslySetInnerHTML={{ __html: jobDescription.eligibilityCriteria }} />

        <h3 className="card-subtitle mb-3">{jobDescription.headers.compensation}</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.compensation }} />

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Quality Level</th>
              <th>Bonus Amount</th>
            </tr>
          </thead>
          <tbody>
            {jobDescription.bonusTable.map((row, index) => (
              <tr key={index}>
                <td>{row.level}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="card-subtitle mb-3">{jobDescription.headers.estimatedTime}</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.estimatedTime }} />
      </>
    );
  };

  return (
    <div className="jumbotron m-3">
      <div className="container">
        <div className="row mt-4"></div>
        <div className="card mt-4">
          <div className="card-body">
            {renderJobDescription()}
            {showButton && (
              <Button className="mt-4" variant="outline-dark" size="lg" onClick={handleProceedClick}>
                Proceed
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
