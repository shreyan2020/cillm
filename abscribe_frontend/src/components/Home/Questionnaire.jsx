import React, { useContext } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import QualtricsEmbed from "./QualtricsEmbed";
import { TaskContext } from '../../context/TaskContext';
import Button from "react-bootstrap/Button";

export default function Questionnaire() {
    const navigate = useNavigate();
    const location = useLocation();
    const { taskID } = useContext(TaskContext);
    console.log('task_id', taskID);
    const handleNavigate = () => {
        navigate("/task");
    };
    return (
        <>
        <div className="jumbotron m-3">
            <div className="container">
                <div className="col-md-12">
                    <QualtricsEmbed taskID={taskID}/>
                </div>
                <Button
                    className="mt-4"
                    onClick={handleNavigate}
                    variant="outline-dark"
                    size="lg"
                >
                    Next Task
                </Button>
            </div>
        </div>
        </>
    )
}
