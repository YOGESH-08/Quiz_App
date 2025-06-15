import React, { useEffect, useState } from "react";
import "./App.css";
import { Ripple, initMDB } from "mdb-ui-kit";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function App() {
  useEffect(() => {
    initMDB({ Ripple });
    homeScreen();
  }, []);

  const [createQuiz, setCreateQuiz] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [duration, setDuration] = useState(5);
  const [showCreateQOptWindow, setShowCreateQOptWindow] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizlist, setQuizList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedQuizName, setSelectedQuizName] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(0);
  const [edit, setEdit] = useState(false);
  const [showQuizCard, setShowQuizCard] = useState(true);
  const [toBeUpdatedFormData, setToBeUpdatedFormData] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const [formData, setFormData] = useState({
    QuestionName: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });

  const homeScreen = async () => {
    try {
      const detailsOfQuizCreatedByUser = await axios.get(
        "http://localhost:8080/quize"
      );
      console.log(
        "Successfully got the names of quizes to be displayed as card"
      );
      setQuizList(detailsOfQuizCreatedByUser.data);
      console.log(detailsOfQuizCreatedByUser.data);
      setDuration(5);
      setQuizName("");
      setFormData({
        QuestionName: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      });
    } catch (err) {
      console.log(
        "Error in getting the names of quiz from back_end",
        err.message
      );
    }
  };
  async function handleEditQuizBackEnd() {
    try {
      const response = await axios.get(
        `http://localhost:8080/quize/edit/${selectedQuizName}/${selectedQuizId}`
      );
      console.log("A-Z Details of quiz recieved sucessfully :", response.data);
      setToBeUpdatedFormData(response.data);
      setShowEditForm(true); 
    } catch (err) {
      console.log("error in editing quiz : ", err.message);
    }
  }

  const handleEditQuiz = () => {
    handleEditQuizBackEnd();
    if (toBeUpdatedFormData.length > 0) {
      return (
        <>
          <div className="container mt-5">
            <div className="card shadow p-4">
              <h4 className="mb-4 text-center text-primary">Create New Quiz</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="quizName" className="form-label">
                    Quiz Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="quizName"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder="Enter quiz name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="numQuestions" className="form-label">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numQuestions"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    placeholder="Enter total number of questions"
                    min="1"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter quiz duration"
                    min="5"
                    step="5"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Create Quiz
                </button>
              </form>
            </div>
          </div>
          <div className="container mt-5">
            <div className="card shadow p-4">
              <h4 className="mb-4 text-center text-primary">
                Edit Question {currentQuestionIndex + 1} of {numQuestions}
              </h4>
              <form onSubmit={handleQuestionSubmit}>
                <div className="mb-3">
                  <label className="form-label">Question</label>
                  <input
                    type="text"
                    name="QuestionName"
                    className="form-control"
                    value={formData.QuestionName}
                    onChange={handleQuestiondetails}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Option 1</label>
                    <input
                      type="text"
                      name="option1"
                      className="form-control"
                      value={formData.option1}
                      onChange={handleQuestiondetails}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Option 2</label>
                    <input
                      type="text"
                      name="option2"
                      className="form-control"
                      value={formData.option2}
                      onChange={handleQuestiondetails}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Option 3</label>
                    <input
                      type="text"
                      name="option3"
                      className="form-control"
                      value={formData.option3}
                      onChange={handleQuestiondetails}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Option 4</label>
                    <input
                      type="text"
                      name="option4"
                      className="form-control"
                      value={formData.option4}
                      onChange={handleQuestiondetails}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Correct Option (1–4)</label>
                  <input
                    type="number"
                    name="correctOption"
                    className="form-control"
                    value={formData.correctOption}
                    onChange={handleQuestiondetails}
                    min="1"
                    max="4"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {currentQuestionIndex === parseInt(numQuestions) - 1
                    ? "Finish"
                    : "Save & Next Question"}
                </button>
              </form>
            </div>
          </div>
        </>
      );
    }
    else return null;
  };

  async function handleDelete() {
    setShowConfirm(false);
    try {
      const response = await axios.delete(
        `http://localhost:8080/quize/delete/${selectedQuizName}/${selectedQuizId}`
      );
      console.log("Successful", response.data);
      await homeScreen();
    } catch (err) {
      console.log("error in deleting : ", err.message);
    }
  }

  function quizCard() {
    if (quizlist.length > 0 && showQuizCard) {
      return (
        <div className="d-flex flex-wrap justify-content-start gap-3">
          {quizlist.map((Name, index) => (
            <div key={index} className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h2 className="card-title">{Name.quiz_name}</h2>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  No. of Questions: {Name.total_questions}
                </li>
                <li className="list-group-item">
                  Duration: {Name.duration_minutes} mins
                </li>
                <li className="list-group-item">Score:</li>
              </ul>
              <div className="card-body">
                <a className="card-link" style={{ cursor: "pointer" }}>
                  Start
                </a>
                <a
                  className="card-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEdit(true);
                    setShowQuizCard(false);
                    setSelectedQuizId(Name.quiz_id);
                    setSelectedQuizName(Name.quiz_name);
                  }}
                >
                  Edit
                </a>
                <a
                  className="card-link"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirm(true);
                    setSelectedQuizName(Name.quiz_name);
                    setSelectedQuizId(Name.quiz_id);
                  }}
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (showQuizCard && quizlist.length == 0) {
      return <p>No Quizzes found!</p>;
    }
  }

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
      await homeScreen();
      console.log("Server response (QuizName):", response.data);
      setCreateQuiz(false);
      setShowCreateQOptWindow(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  function getInpForNewQuiz() {
    if (!createQuiz) return null;

    return (
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h4 className="mb-4 text-center text-primary">Create New Quiz</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="quizName" className="form-label">
                Quiz Name
              </label>
              <input
                type="text"
                className="form-control"
                id="quizName"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="numQuestions" className="form-label">
                Number of Questions
              </label>
              <input
                type="number"
                className="form-control"
                id="numQuestions"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                placeholder="Enter total number of questions"
                min="1"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter quiz duration"
                min="5"
                step="5"
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    );
  }

  function quizQOptWindow() {
    if (!showCreateQOptWindow) return null;

    return (
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h4 className="mb-4 text-center text-primary">
            Add Question {currentQuestionIndex + 1} of {numQuestions}
          </h4>
          <form onSubmit={handleQuestionSubmit}>
            <div className="mb-3">
              <label className="form-label">Question</label>
              <input
                type="text"
                name="QuestionName"
                className="form-control"
                value={formData.QuestionName}
                onChange={handleQuestiondetails}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Option 1</label>
                <input
                  type="text"
                  name="option1"
                  className="form-control"
                  value={formData.option1}
                  onChange={handleQuestiondetails}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Option 2</label>
                <input
                  type="text"
                  name="option2"
                  className="form-control"
                  value={formData.option2}
                  onChange={handleQuestiondetails}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Option 3</label>
                <input
                  type="text"
                  name="option3"
                  className="form-control"
                  value={formData.option3}
                  onChange={handleQuestiondetails}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Option 4</label>
                <input
                  type="text"
                  name="option4"
                  className="form-control"
                  value={formData.option4}
                  onChange={handleQuestiondetails}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Correct Option (1–4)</label>
              <input
                type="number"
                name="correctOption"
                className="form-control"
                value={formData.correctOption}
                onChange={handleQuestiondetails}
                min="1"
                max="4"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {currentQuestionIndex === parseInt(numQuestions) - 1
                ? "Finish"
                : "Next Question"}
            </button>
          </form>
        </div>
      </div>
    );
  }

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
                <a
                  style={{ cursor: "pointer" }}
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    setShowCreateQOptWindow(false);
                    setCreateQuiz(false);
                    setShowQuizCard(true);
                    setEdit(false);
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Import</a>
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
      {edit ? handleEditQuiz() : null}
      {!createQuiz && !showCreateQOptWindow && quizCard()}
      <div>
        {showConfirm ? (
          <ConfirmBox
            show={showConfirm}
            handleClose={() => setShowConfirm(false)}
            handleConfirm={handleDelete}
            message={`Are you sure you want to delete ?\nNote: This cannot be undone.`}
          />
        ) : null}
      </div>

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
