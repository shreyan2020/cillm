import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tutorial from "../Home/Tutorial"; // Adjust the import path as necessary
import JobDescription from "../Home/JobDescription"; // Adjust the import path as necessary

export default function NavHeader() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="light" expand="sm" sticky="top">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link onClick={() => handleShow("instructions")}>Instructions</Nav.Link>
              <Nav.Link onClick={() => handleShow("jobDescription")}>Task Description</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent === "instructions" ? "Instructions" : "Task Description"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "instructions" ? <Tutorial showButton={false} /> : <JobDescription showButton={false} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
