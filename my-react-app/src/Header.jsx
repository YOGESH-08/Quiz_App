import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Wodal from "./Wodal";

function Header(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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
          {props.isRunning ? (
            <li className="nav-item">
              <span className="nav-link active">{props.time}</span>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  {props.button1}
                </a>
              </li>
              <li className="nav-item">
                <a
                  // href="#"
                  className="nav-link"
                  onClick={() => {
                    if (props.button2 == "Search Quiz") {
                      setShowProfile(true);
                    }
                  }}
                >
                  {props.button2}
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => {
                   
                      setShowProfile(true);
                    
                  }}
                >
                  {props.button3}
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => setShowWarning(true)}
                >
                  {props.button4}
                </a>
              </li>
            </>
          )}
        </ul>
      </header>

      <Wodal
        show={showSearch}
        onHide={() => setShowSearch(false)}
        heading="Search Quiz by code"
        endButton="Search"
      />

      <Wodal
        show={showProfile}
        onHide={() => setShowProfile(false)}
        heading="Hi! [name]
      profile"
        endButton="close"
      />

      <Wodal
        show={showWarning}
        onHide={() => setShowWarning(false)}
        heading="Confirm Logout"
        body="Unsaved Data Will be lost"
        endButton="Logout"
      />
    </div>
  );
}

export default Header;
