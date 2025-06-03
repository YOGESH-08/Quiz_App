import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import { Modal, Button, FormLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Wodal from "./Wodal";

function App() {
  let randomQuizes;
  const numberOption = [];
  for (let i = 1; i < 51; i++) {
    numberOption.push(i);
  }

  const [showTrivia, setshowTrivia] = useState(false);

  const fetchAPI = async () => {
    const randomQuizes = await axios.get("http://localhost:8080/quize/random");
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <Header />
      <div>
        <p className="Random">Available Quizes</p>
        <div>
          <div className="boxes">
            <div>Box 1</div>
            <div>Box 2</div>
          </div>
        </div>
        <div className="">
          <p className="Random">Try Random Quiz</p>
          <div onClick={() => setshowTrivia(true)}>
            <div className="boxes">
              <div>Trivia Quiz</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="container-fluid">
          {" "}
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            {" "}
            <div className="col-md-4 d-flex align-items-center">
              {" "}
              <a
                href="/"
                className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                aria-label="Bootstrap"
              >
                {" "}
                <svg className="bi" width="30" height="24" aria-hidden="true">
                  <use xlinkHref="#bootstrap"></use>
                </svg>{" "}
              </a>{" "}
              <span className="mb-3 mb-md-0 text-body-secondary">
                © 2025 Quize, Inc
              </span>{" "}
            </div>{" "}
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              {" "}
              <li className="ms-3">
                <a
                  className="text-body-secondary"
                  href="#"
                  aria-label="Instagram"
                >
                  <svg className="bi" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
              </li>{" "}
              <li className="ms-3">
                <a
                  className="text-body-secondary"
                  href="#"
                  aria-label="Instagram"
                >
                  <svg className="bi" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
                <a
                  className="text-body-secondary"
                  href="#"
                  aria-label="Facebook"
                >
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>{" "}
            </ul>{" "}
          </footer>{" "}
        </div>
      </div>
      <Wodal
        show={showTrivia}
        onHide={() => setshowTrivia(false)}
        heading="Random Trivia Quiz"
        body={
          <form action="/TriviaQuize" method="POST">
            <div>
              <label htmlFor="Difficultylevel">Select Difficulty level</label>
              <select name="categroy" id="Difficultylevel">
                <option value="Select">Select</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="Numberofquestions">
                Select Number of questions
              </label>
              <select name="categroy" id="Numberofquestions">
                {numberOption.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </form>
        }
      />
    </>
  );
}

export default App;
