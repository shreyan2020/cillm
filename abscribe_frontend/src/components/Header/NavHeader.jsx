import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tutorial from "../Home/Tutorial"; // Adjust the import path as necessary
import JobDescription from "../Home/JobDescription"; // Adjust the import path as necessary
import { TaskContext } from "../../context/TaskContext"; // Import the TaskContext

export default function NavHeader() {
  const { studyID } = useContext(TaskContext); // Access studyID from TaskContext
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleShow = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const missionStatementEN = (
    <p><b>The mission of the World Wildlife Fund (WWF)</b> is to conserve nature and reduce the most pressing threats to the diversity of life on Earth. Our vision is to build a future in which people live in harmony with nature. We aim to save a planet rich with biodiversity by reconciling the needs of human beings with the needs of other species. We strive to practice humane conservation, instilling a reverence for nature and balancing it with a belief in human potential. From local communities to global organizations, we inspire and support those advancing the cause of conservation. As a voice for the voiceless creatures of our world, we dedicate our talents, knowledge, and passion to enriching life, spirit, and the wonder of nature.</p>
  );

  const missionStatementES = (
    <p><b>La misión del Fondo Mundial para la Naturaleza (WWF)</b> es conservar la naturaleza y reducir las amenazas más urgentes a la diversidad de la vida en la Tierra. Nuestra visión es construir un futuro en el que las personas vivan en armonía con la naturaleza. Nuestro objetivo es salvar un planeta rico en biodiversidad, conciliando las necesidades de los seres humanos con las de otras especies. Nos esforzamos por practicar la conservación humanitaria, inculcando un respeto por la naturaleza y equilibrándolo con una creencia en el potencial humano. Desde las comunidades locales hasta las organizaciones globales, inspiramos y apoyamos a aquellos que avanzan en la causa de la conservación. Como voz de las criaturas sin voz de nuestro mundo, dedicamos nuestros talentos, conocimientos y pasión a enriquecer la vida, el espíritu y el asombro por la naturaleza.</p>
  );

  const missionStatement = studyID === '66aca63c781c99be382101f6' ? missionStatementEN : missionStatementES;

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
              <Nav.Link onClick={() => handleShow("missionStatement")}>Mission Statement</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent === "instructions" && "Instructions"}
            {modalContent === "jobDescription" && "Task Description"}
            {modalContent === "missionStatement" && "Mission Statement"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "instructions" && <Tutorial showButton={false} />}
          {modalContent === "jobDescription" && <JobDescription showButton={false} />}
          {modalContent === "missionStatement" && missionStatement}
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
