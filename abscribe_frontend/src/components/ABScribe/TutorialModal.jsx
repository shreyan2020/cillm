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
      <p>Please click on all the buttons before proceeding.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={onWaiveValidation}>
        Waive Validation
      </Button>
    </Modal.Footer>
  </Modal>
);

export default TutorialModal;
