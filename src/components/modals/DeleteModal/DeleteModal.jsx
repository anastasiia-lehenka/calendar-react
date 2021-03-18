import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ event, deleteEvent, cancelDelete }) => (
  <Modal
    className="delete-modal fade"
    show
    backdrop="static"
    keyboard={false}
    centered
    onHide={cancelDelete}
  >
    <Modal.Header closeButton>
      <Modal.Title>Delete event</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <p>Are you sure you want to delete "{event.name}" event?</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={cancelDelete}>No</Button>
      <Button variant="primary" onClick={() => deleteEvent(event.id)}>Yes</Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteModal;
