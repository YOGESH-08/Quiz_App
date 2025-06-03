import { Modal, Button } from "react-bootstrap";

function Wodal({ show, onHide, heading, body, endButton, onClick}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClick}>
          {endButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Wodal;
