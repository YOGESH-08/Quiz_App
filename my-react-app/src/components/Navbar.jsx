import React from 'react';

function Navbar({ setCreateQuiz, navStates, setShowCreateQOptWindow, setShowQuizCard, setEdit }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top" style={{ padding: "0.7rem 2rem" }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" style={{ gap: "10px", cursor: "pointer" }} onClick={navStates}> 
          <span style={{ color: "#198754", fontSize: "2rem", fontWeight: "bold", letterSpacing: "2px" }}>Quize</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: "1.1rem" }}>
            <li className="nav-item">
              <a
                style={{ cursor: "pointer", color: "#198754", fontWeight: "500", transition: "color 0.2s" }}
                className="nav-link active"
                aria-current="page"
                onClick={navStates}
                onMouseOver={e => e.target.style.color = "#0d6efd"}
                onMouseOut={e => e.target.style.color = "#198754"}
              >
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                Profile
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">Action</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Another action</a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">Log out</a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{
                  cursor: "pointer",
                  background: "#198754",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "6px 18px",
                  marginLeft: "10px",
                  fontWeight: "500",
                  boxShadow: "0 2px 8px rgba(25,135,84,0.08)",
                  transition: "background 0.2s"
                }}
                onClick={() => {
                  setCreateQuiz(true);
                  setShowCreateQOptWindow(false);
                  setShowQuizCard(true);
                  setEdit(false);
                }}
                onMouseOver={e => e.target.style.background = "#157347"}
                onMouseOut={e => e.target.style.background = "#198754"}
              >
                + Create a New Quiz
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search" style={{ gap: "8px" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Quiz"
              aria-label="Search"
              style={{ borderRadius: "8px" }}
            />
            <button className="btn btn-outline-success" type="submit" style={{ borderRadius: "8px" }}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
