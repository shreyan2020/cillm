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
              <p>
        We are a group of researchers at the Technical University of Delft in The Netherlands. In this research project, we aim to investigate [Insert project summary]. As such, you are invited to participate in our research study.
    </p>
        
    <p>
        The following task is part of the research project described above. Upon accessing the web application you will be presented with two tasks in two different languages both pertaining to writing a persuasive text message 
        for two charities using an AI powered text editor. After each task you will be asked to fill in a small questionnaire that relates to your user experirience with the editor.
        
    </p>
    
    <p>
        Completion of these tasks do not require any specific equipment. Your participation in this task is entirely voluntary and you can withdraw at any time. 
        We will collect your usage (how you interacted with the text editor - your keystrokes etc) and your experience with tool.
        We do not collect any data aside from the information described above. However, some demographics (gender and age) from the crowd sourcing platform, and your randomly assigned worker identifier.
    </p>

    <p>
        We will keep your information confidential to the best of our ability. All data is stored in a password protected electronic format. 
        Be aware that the data we gather with this task might be published in an anonymised form later. 
        Such an anonymised data set would include the answers you provide in this task, but no personal information (e.g., your worker ID) so that the answers will not be traceable back to you.

    </p>    
    <p>
        By clicking “I consent” at the bottom of this page, you confirm that you have read, understood, and consent to the above information.
    </p>
    <p>
        Note: You can at any time exit the task. This will imply revoking of your consent and subsequently all your data will be discarded from our databases.
    </p>
              {/* <p>Your job in this task is to write two advertisements for the charity [Placeholder]. For more information about [Placeholder], please refer to the infobox. You will always be able to access the infobox.

You will write the first advertisement in English [Spanish], and the second one in Spanish [English]. Each advertisement should be between X and Y characters long.

Our goal is to maximize charitable donations. Therefore, we are looking for advertisements that are able to persuade people to donate to [Placeholder]. 

We are commissioning several people to come up with persuasive ads. Once we gather enough, we will test the advertisements in a follow-up task involving hundreds of real donation decisions from hundreds of people. 
You will receive bonus income based on (1) how many people donate (2) how much to [Placeholder] after viewing your advertisement. Since we elicit donations in both English and Spanish speaking countries, you can earn bonus money for both advertisements.
</p> */}
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    type="checkbox"
                    id="agree"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <label htmlFor="agree"> I Consent</label>
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
