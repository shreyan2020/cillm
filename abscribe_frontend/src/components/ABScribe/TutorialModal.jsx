import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const TutorialModal = ({ show, onHide, missingButtons, requiredButtons, onWaiveValidation }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Required Actions</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {requiredButtons.map(button => (
          <Form.Check
            key={button.id}
            type="checkbox"
            label={button.name}
            checked={!missingButtons.includes(button.name)}
            readOnly
          />
        ))}
      </Form>
      <p>You still have not explored all features. Do you want to explore more or continue to the main task?</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Stay and Explore More
      </Button>
      {/* <Button variant="primary" onClick={onWaiveValidation}>
        Continue to Main Task
      </Button> */}
    </Modal.Footer>
  </Modal>
);

export default TutorialModal;
