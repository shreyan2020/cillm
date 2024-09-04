import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext';
import '../../scss/job-description.scss';

const JobDescription = ({ showButton = true }) => {
  const navigate = useNavigate();
  const { tasksConfig } = useContext(TaskContext); // Get taskConfig from context

  const handleProceedClick = () => {
    navigate('/donation');
  };

  const renderJobDescription = () => {
    const jobDescription = tasksConfig.config.jobDescription;

    return (
      <>
        <h2 className="card-title">{jobDescription.headers.taskDetails}</h2>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.taskDetails }} />

        {/* <h3 className="card-subtitle mb-3">{jobDescription.headers.eligibilityCriteria}</h3> */}
        {/* <ul dangerouslySetInnerHTML={{ __html: jobDescription.eligibilityCriteria }} /> */}

        <h3 className="card-subtitle mb-3">{jobDescription.headers.compensation}</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.compensation }} />

        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th>{jobDescription.headers.qualityLevel}</th>
              <th>{jobDescription.headers.bonusAmount}</th>
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
        </table> */}

        {/* <h3 className="card-subtitle mb-3">{jobDescription.headers.estimatedTime}</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDescription.estimatedTime }} /> */}
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
