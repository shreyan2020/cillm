import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QualtricsEmbed from "./QualtricsEmbed";
import { TaskContext } from '../../context/TaskContext';
import tasksConfig from "../../taskConfig"; // Import the task configuration
import Button from "react-bootstrap/Button";

export default function Questionnaire() {
    const navigate = useNavigate();
    const location = useLocation();
    const { taskID } = useContext(TaskContext);
    const taskOrder = tasksConfig.order;
    const isLastTask = taskID === taskOrder[taskOrder.length - 1]; // Check if the current task is the last one

    const handleNavigate = () => {
        navigate("/task");
    };

    return (
        <>
            <div className="jumbotron m-3">
                <div className="container">
                    <div className="col-md-12">
                        <QualtricsEmbed taskID={taskID} />
                    </div>
                    <Button
                        className="mt-4"
                        onClick={handleNavigate}
                        variant="outline-dark"
                        size="lg"
                    >
                        {isLastTask ? "Finish Task" : "Next Task"} {/* Modify button text based on task position */}
                    </Button>
                </div>
            </div>
        </>
    );
}
