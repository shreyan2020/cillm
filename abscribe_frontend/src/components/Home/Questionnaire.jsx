import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QualtricsEmbed from "./QualtricsEmbed";
import { TaskContext } from '../../context/TaskContext';
import Button from "react-bootstrap/Button";

export default function Questionnaire() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionnaireID, prolificID } = useContext(TaskContext);

  const handleNavigate = () => {
    navigate("/task");
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="col-md-12">
            <QualtricsEmbed taskID={questionnaireID} prolificID={prolificID} />
          </div>
          <h3> DO NOT CLICK THE NEXT BUTTON BELOW UNLESS YOU ARE INSTRUCTED TO VIA THE SURVEY.</h3>
          <Button
            className="mt-4"
            onClick={handleNavigate}
            variant="outline-dark"
            size="lg"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
