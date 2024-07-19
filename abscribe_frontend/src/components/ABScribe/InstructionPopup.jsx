import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

const PopUp = ({ show, message, onNext, onPrev, onClose, step, totalSteps }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Tutorial Step {step} of {totalSteps}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <Image
          src="https://via.placeholder.com/100"
          roundedCircle
          className="mb-3"
        />
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onPrev} disabled={step === 1}>
          Previous
        </Button>
        <Button variant="primary" onClick={onNext} disabled={step === totalSteps}>
          Next
        </Button>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUp;
