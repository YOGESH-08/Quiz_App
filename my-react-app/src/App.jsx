import React, { useEffect, useState } from "react";
import "./App.css";
import { Ripple, initMDB } from "mdb-ui-kit";
import axios from "axios";

function App() {
  useEffect(() => {
    initMDB({ Ripple });
  }, []);

  const [createQuiz, setCreateQuiz] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [showCreateQOptWindow, setShowCreateQOptWindow] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState({
  QuestionName: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctOption: "",
});


  function handleQuestiondetails(e) {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleQuestionSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/quize/${quizName}/addquestion`,
        formData
      );
      console.log("Question sent to backend:", response.data);
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < parseInt(numQuestions)) {
        setCurrentQuestionIndex(nextIndex);
        setFormData({
          QuestionName: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctOption: "",
        });
      } else {
        alert("All questions added!");
        setShowCreateQOptWindow(false);
        setCurrentQuestionIndex(0);
      }
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/quize/createquiz",
        {
          QuizName: quizName,
          noofquestions: numQuestions,
          duration: duration,
        }
      );
      console.log("Server response (QuizName):", response.data);
      setCreateQuiz(false);
      setShowCreateQOptWindow(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  function getInpForNewQuiz() {
    if (createQuiz) {
      return (
        <div className="createnewquizwindow">
          <div className="child">
            <form onSubmit={handleSubmit}>
              <label htmlFor="QuizName">Enter Quiz Name</label>
              <input
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />

              <label>Number of Questions</label>
              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="0"
              />

              <label>Enter the Time (min)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="5"
                step="5"
              />
              <button
                type="submit"
                // onClick={() => {
                //   setCreateQuiz(false);
                //   setShowCreateQOptWindow(true);
                // }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  function quizQOptWindow() {
    if (!showCreateQOptWindow) return;
    return (
      <form onSubmit={handleQuestionSubmit}>
        <h4>
          Question {currentQuestionIndex + 1} of {numQuestions}
        </h4>

        <label>Question</label>
        <input
          type="text"
          name="QuestionName"
          value={formData.QuestionName}
          onChange={handleQuestiondetails}
          required
        />

        <label>Option 1</label>
        <input
          type="text"
          name="option1"
          value={formData.option1}
          onChange={handleQuestiondetails}
          required
        />
        <label>Option 2</label>
        <input
          type="text"
          name="option2"
          value={formData.option2}
          onChange={handleQuestiondetails}
          required
        />
        <label>Option 3</label>
        <input
          type="text"
          name="option3"
          value={formData.option3}
          onChange={handleQuestiondetails}
          required
        />
        <label>Option 4</label>
        <input
          type="text"
          name="option4"
          value={formData.option4}
          onChange={handleQuestiondetails}
          required
        />

        <label>Correct Option (1–4)</label>
        <input
          type="number"
          name="correctOption"
          value={formData.correctOption}
          onChange={handleQuestiondetails}
          min="1"
          max="4"
          required
        />

        <button type="submit">
          {currentQuestionIndex === parseInt(numQuestions) - 1
            ? "Finish"
            : "Next"}
        </button>
      </form>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <span style={{ color: "Green", fontSize: "30px" }}>Quize</span>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
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
                >
                  Profile
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Log out
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setCreateQuiz(true);
                  }}
                >
                  Create a New Quiz
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Quiz"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {getInpForNewQuiz()}
      {quizQOptWindow()}

      <footer className="bg-body-tertiary text-center">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              data-mdb-ripple-init
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2025 Copyright
        </div>
      </footer>
    </>
  );
}

export default App;
