import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { TaskContext } from "./context/TaskContext";

export default function ErrorPage() {
  const { prolificID } = useContext(TaskContext);

  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="d-flex align-items-center justify-content-center vh-100 bg-secondary">
        <div>
          <div>
            <h1 className="display-1 fw-bold text-white">{error.status}</h1>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="fw-bold text-white">
              {error.statusText || error.message}
            </h3>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Link
              className="btn btn-outline-dark btn-lg"
              to={`/welcome/?prolific_id=${prolificID}`}
              role="button"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
