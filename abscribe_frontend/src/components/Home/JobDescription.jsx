import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { TaskContext } from '../../context/TaskContext'; // Import TaskContext
import '../../scss/job-description.scss'; // Import CSS for styling

const JobDescription = () => {
  const navigate = useNavigate();
  const { studyID } = useContext(TaskContext); // Get studyID from context

  const handleProceedClick = () => {
    navigate('/task');
  };

  const getProficiencyLanguage = () => {
    if (studyID === 'A') {
      return 'English';
    } else if (studyID === 'B') {
      return 'Spanish';
    } else {
      return 'English'; // Default to English if no valid studyID is provided
    }
  };

  const getEstimatedTime = () => {
    if (studyID === 'A') {
      return '15 minutes';
    } else if (studyID === 'B') {
      return '20 minutes';
    } else {
      return '15 minutes'; // Default to 15 minutes if no valid studyID is provided
    }
  };

  return (
    <div className="jumbotron m-3">
      <div className="container">
        <div className="row mt-4"></div>
        <div className="card mt-4">
          <div className="card-body">
            <h2 className="card-title">Task Details</h2>
            <p>Thank you for considering this opportunity.</p>

            <h3 className="card-subtitle">Eligibility Criteria</h3>
            <ul>
              <li>You are proficient in {getProficiencyLanguage()}.</li>
              <li>Your profile indicates that you work in a writing-related profession.</li>
            </ul>

            <h3 className="card-subtitle">Task Details</h3>
            <p>We are seeking individuals to write one short advertisement for one charity. Each advertisement should consist of a maximum of 50 words.</p>
            <p>Your responses and work on this task will be stored securely, and your identity will remain anonymous.</p>

            <h3 className="card-subtitle">Compensation</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Quality Level</th>
                  <th>Bonus Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Top 20%</td>
                  <td>£4.00</td>
                </tr>
                <tr>
                  <td>Top 10%</td>
                  <td>£10.00 (additional £6.00)</td>
                </tr>
                <tr>
                  <td>Top 1%</td>
                  <td>£20.00 (additional £10.00)</td>
                </tr>
              </tbody>
            </table>
            <p>You will be compensated at a flat rate of £3.00 for completing this task. Additionally, you can earn a bonus of up to £20.00 based on the quality and effectiveness of your advertisement.</p>

            <h3 className="card-subtitle">Estimated Time</h3>
            <p>This task is estimated to take approximately {getEstimatedTime()}. If you are ready to complete the job without interruptions during this time, please click "Proceed" to start. Thank you for your interest!</p>

            <Button className="mt-4" variant="outline-dark" size="lg" onClick={handleProceedClick}>
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;