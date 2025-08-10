import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmBox({ show, handleClose, handleConfirm, message }) {
  return (
    <Modal show={show} onHide={handleClose} centered size="sm">
      <Modal.Body className="text-center p-4">
        <p className="mb-3">{message || "Are you sure?"}</p>
        <div className="d-flex justify-content-around">
          <Button variant="danger" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ConfirmBox;