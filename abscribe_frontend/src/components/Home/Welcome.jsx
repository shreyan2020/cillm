import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "prismjs/themes/prism.css";
import "../../scss/home.scss";
import Button from "react-bootstrap/Button";
import { TaskContext } from "../../context/TaskContext";

export default function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();

  const { prolificID, setProlificID } = useContext(TaskContext);
  const [validationError, setValidationError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prolific_id = params.get("prolific_id");
    console.log('prolific_id', prolific_id);
    if (prolific_id) {
      setProlificID(prolific_id);
    }
  }, [location.search, setProlificID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isChecked) {
      navigate("/tutorial");
    } else {
      setValidationError("You must agree before proceeding.");
    }
  };

  return (
    <>
      <div className="jumbotron m-3">
        <div className="container">
          <div className="row mt-4">
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="card-title">Instruction</h2>
              <p>Your job in this task is to write two advertisements for the charity [Placeholder]. For more information about [Placeholder], please refer to the infobox. You will always be able to access the infobox.

You will write the first advertisement in English [Spanish], and the second one in Spanish [English]. Each advertisement should be between X and Y characters long.

Our goal is to maximize charitable donations. Therefore, we are looking for advertisements that are able to persuade people to donate to [Placeholder]. 

We are commissioning several people to come up with persuasive ads. Once we gather enough, we will test the advertisements in a follow-up task involving hundreds of real donation decisions from hundreds of people. 
You will receive bonus income based on (1) how many people donate (2) how much to [Placeholder] after viewing your advertisement. Since we elicit donations in both English and Spanish speaking countries, you can earn bonus money for both advertisements.
</p>
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="agree"> I agree</label>
                </div>
                {validationError && (
                  <p style={{ color: "red" }}>{validationError}</p>
                )}
                <Button
                  className="mt-4"
                  type="submit"
                  variant="outline-dark"
                  size="lg"
                  disabled={!isChecked} // Disable the button if checkbox is not checked
                >
                  Proceed to Instructions
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
