import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from "react-bootstrap";



function Header(){

    const [show,setShow] = useState(false);

    return (
        <div className="container-fluid">

      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          
          <svg className="bi me-2" width="40" height="32" aria-hidden="true">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">QUIZE</span>
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="" aria-current="page">
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Create Quiz 
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"  onClick={()=>setShow(true)}>
                 Search Quiz
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"  onClick={()=>setShow(true)}>
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link"  onClick={()=>setShow(true)}>
              Log out
            </a>
          </li>
        </ul>
      </header>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a New Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is your quiz creation form or content area.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
    );
}

export default Header;