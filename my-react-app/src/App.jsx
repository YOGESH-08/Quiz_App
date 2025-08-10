import React, { use, useEffect, useState, useRef } from "react";
import "./App.css";
import { Ripple, initMDB } from "mdb-ui-kit";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import QuizCardList from "./components/QuizCardList";

function App() {
  useEffect(() => {
    initMDB({ Ripple });
    homeScreen();
  }, []);

  const [quizName, setQuizName] = useState("");
  const [numQuestions, setNumQuestions] = useState();
  const [prevNum, setPrevNum] = useState(numQuestions);
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
  const [upDuration, setUpDuration] = useState(5);
  const [upName, setUpName] = useState(0);
  const [addingIndex, setAddingIndex] = useState(0);
  const [addQs, setAddQs] = useState(false);
  const [upNum, setUpNum] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedQuizNum, setSelectedQuizNum] = useState(0);
const [startQuiz, setStartQuiz] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
const [quizData, setQuizData] = useState([]);
const [questionStatus, setQuestionStatus] = useState({});
const [showModal, setShowModal] = useState(false);
const [score, setScore] = useState(0);
  const [formData, setFormData] = useState({
    QuestionName: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });
  const [createQuiz, setCreateQuiz] = useState(false);
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
        `http://localhost:8080/quize/edit/${selectedQuizId}`
      );
      console.log("Got the quiz editing details", response.data);
      setToBeUpdatedFormData(response.data);
    } catch (err) {
      console.log("error in editing quiz : ", err.message);
    }
  }

  const [editingIndex, setEditingIndex] = useState(0);
  useEffect(() => {
    if (edit && toBeUpdatedFormData) {
      const current = toBeUpdatedFormData[editingIndex];
      setFormData({
        QuestionName: current.question_text || "",
        option1: current.option_a || "",
        option2: current.option_b || "",
        option3: current.option_c || "",
        option4: current.option_d || "",
        correctOption: current.correct_option || 1,
      });
      setUpDuration(current.duration_minutes);
      setUpName(current.quiz_name);
      setUpNum(current.total_questions);
    }
  }, [editingIndex, toBeUpdatedFormData]);

  function editform() {
    if (!toBeUpdatedFormData || !toBeUpdatedFormData[editingIndex])
      return <p>Loading...</p>;
    return (
      <>
        <div className="container mt-5">
          <div className="card shadow p-4">
            <h4 className="mb-4 text-center text-primary">
              Edit Quiz {toBeUpdatedFormData?.[editingIndex]?.quiz_name || " "}
            </h4>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label htmlFor="quizName" className="form-label">
                  Quiz Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quizName"
                  value={upName || ""}
                  onChange={(e) => setUpName(e.target.value)}
                  placeholder="Enter quiz name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="numQuestions" className="form-label">
                  Number of Questions
                </label>
                <input
                  min={numQuestions}
                  max={numQuestions}
                  type="number"
                  className="form-control"
                  id="numQuestions"
                  value={upNum}
                  onChange={(e) => setUpNum(e.target.value)}
                  placeholder="Enter total number of questions"
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
                  value={upDuration}
                  onChange={(e) => setUpDuration(e.target.value)}
                  placeholder="Enter quiz duration"
                  min="5"
                  step="5"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="container mt-5">
          <div className="card shadow p-4">
            <h4 className="mb-4 text-center text-primary">
              Edit Question {editingIndex + 1} of {upNum}
            </h4>
            <form onSubmit={handleEditedQuestionSubmit}>
              <div className="mb-3">
                <label className="form-label">Question</label>
                <input
                  type="text"
                  name="QuestionName"
                  className="form-control"
                  value={formData.QuestionName || ""}
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
                    value={formData.option1 || ""}
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
                    value={formData.option2 || ""}
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
                    value={formData.option3 || ""}
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
                    value={formData.option4 || ""}
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
                  value={formData.correctOption || ""}
                  onChange={handleQuestiondetails}
                  min="1"
                  max="4"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {editingIndex === parseInt(upNum) - 1
                  ? "Finish"
                  : "Save & Next"}
              </button>
              <button
                onClick={handleEditDeleteQuestionSubmit}
                className="btn btn-primary w-100"
                style={{ marginTop: "8px" }}
              >
                Delete Question
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  async function handleEditDeleteQuestionSubmit(e) {
    e.preventDefault();
    try {
      // console.log("Message : ");
      // console.log(toBeUpdatedFormData[editingIndex]);
      // console.log(editingIndex);
      const current = toBeUpdatedFormData[editingIndex];
      const selectedQuestionId = current.question_id;
      // console.log("selected question id  = ",selectedQuestionId);
      const response = await axios.delete(
        `http://localhost:8080/quize/delete/${selectedQuestionId}`,
        {
          data: { quiz_id: current.quiz_id },
        }
      );
      console.log(
        "Successfully request sent to backend to delete the question",
        response.data
      );
      setUpNum((prev) => prev - 1);
      const nextIndex = editingIndex + 1;
      if (nextIndex < parseInt(upNum)) {
        setEditingIndex(nextIndex);

        setFormData({
          QuestionName: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctOption: "",
        });
      } else {
        setUpNum((prev) => prev - 1);
        alert("All questions updated");
        setEditingIndex(0);
        setEdit(false);
        await homeScreen();
        setShowQuizCard(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleEditedQuestionSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/quize/${toBeUpdatedFormData[editingIndex].quiz_id}/${toBeUpdatedFormData[editingIndex].question_id}/edit`,
        formData
      );
      console.log("Edited questions sent successfully :Q.no: ", editingIndex);
      const nextIndex = editingIndex + 1;
      if (nextIndex < parseInt(upNum)) {
        setEditingIndex(nextIndex);
        setFormData({
          QuestionName: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          correctOption: "",
        });
      } else {
        alert("All questions updated");
        setEditingIndex(0);
        setEdit(false);
        await homeScreen();
        setShowQuizCard(true);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

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

  

  useEffect(() => {
    console.log("selected quizid NUm of questions: ", selectedQuizNum);
  }, [selectedQuizId, selectedQuizNum]);

  async function handleAddeddQuestionSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/quize/addquestions/edit/${selectedQuizId}`,
        formData
      );
      console.log("Success", response.data);
      setAddingIndex((prev) => {
        const next = prev + 1;
        if (next < parseInt(upNum) - 1) {
          setFormData({
            QuestionName: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctOption: "",
          });
        } else {
          alert("All questions Added");
          setAddQs(false);
          setShowQuizCard(true);
          setAddingIndex(0);
          setNumQuestions(upName);
          homeScreen().then(() => setShowQuizCard(true));
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async function handleAddQuestionSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/quize/addquestions/edit/${selectedQuizId}`,
        { updatedNum: Number(upNum) }
      );
      console.log(response.data);
    } catch (err) {
      console.log("Error in changing num of questions(Frontend message) ");
    }
  }

  function addQuestions() {
    return (
      <>
        <div className="container mt-5">
          <div className="card shadow p-4">
            <h4 className="mb-4 text-center text-primary">
              Add Questions{" "}
              {toBeUpdatedFormData?.[editingIndex]?.quiz_name || " "}
            </h4>
            <form onSubmit={handleAddQuestionSubmit}>
              <div className="mb-3">
                <label htmlFor="numQuestions" className="form-label">
                  Number of Questions
                </label>
                <input
                  min={selectedQuizNum + 1}
                  max={100}
                  type="number"
                  className="form-control"
                  id="numQuestions"
                  value={upNum}
                  onChange={(e) => {
                    setUpNum(Number(e.target.value));
                  }}
                  placeholder="Enter total number of questions"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="container mt-5">
          <div className="card shadow p-4">
            <h4 className="mb-4 text-center text-primary">
              Create Question {selectedQuizNum + 1} of {upNum}
            </h4>
            <form onSubmit={handleAddeddQuestionSubmit}>
              <div className="mb-3">
                <label className="form-label">Question</label>
                <input
                  type="text"
                  name="QuestionName"
                  className="form-control"
                  value={formData.QuestionName || ""}
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
                    value={formData.option1 || ""}
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
                    value={formData.option2 || ""}
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
                    value={formData.option3 || ""}
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
                    value={formData.option4 || ""}
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
                  value={formData.correctOption || ""}
                  onChange={handleQuestiondetails}
                  min="1"
                  max="4"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {editingIndex === parseInt(upNum) - 1
                  ? "Finish"
                  : "Save & Next"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
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
        `http://localhost:8080/quize/${quizNameRef.current}/addquestion`,
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

  const quizNameRef = useRef("");

  function handleQuizNameInput(e) {
    quizNameRef.current = e.target.value;
    setQuizName(e.target.value);
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/quize/edit/${selectedQuizName}/${selectedQuizId}/details/update`,
        {
          updatedQuizName: upName,
          updatedQuizNumberOfQues: upNum,
          updatedQuizDuration: upDuration,
        }
      );
      handleEditQuizBackEnd();
      console.log("Editing request sent succssfully", response.data);
    } catch (err) {
      console.log(err.messgae);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setQuizName(quizName);
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
      setQuizName(quizName);
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
                onChange={handleQuizNameInput}
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


async function fetchQuestions(){
  try
 { const response = await axios.get(`http://localhost:8080/quize/start/${selectedQuizId}`);
  setQuizData(response.data);
 }
 catch(err){
  console.log(err.message);
}
}
useEffect(() => {
  setCurrentQuestionIndex(0);
  fetchQuestions();
  setSelectedOption(null);
  setSelectedOptions({});
  setQuestionStatus({});
}, [startQuiz, selectedQuizId]);

function handleOptionClick(option) {
  setSelectedOption(option);
  setSelectedOptions({ ...selectedOptions, [currentQuestionIndex]: option });
  setQuestionStatus({ ...questionStatus, [currentQuestionIndex]: "answered" });
}
function clearSelectedOption() {
  setSelectedOption(null);
  const updated = { ...selectedOptions };
  delete updated[currentQuestionIndex];
  setSelectedOptions(updated);

  const updatedStatus = { ...questionStatus };
  delete updatedStatus[currentQuestionIndex];
  setQuestionStatus(updatedStatus);
}


function skipQuestion() {
  setQuestionStatus({ ...questionStatus, [currentQuestionIndex]: "skipped" });
  goToNext();
}
function goToNext() {
  if (currentQuestionIndex + 1 < quizData.length) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(selectedOptions[currentQuestionIndex + 1] || null);
  }
}
function handleSubmitQuiz() {
  let sc = 0;
  quizData.forEach((q, idx) => {
    const selected = selectedOptions[idx];
   const optionMap = { A: 1, B: 2, C: 3, D: 4 };
if (
  selected &&
  optionMap[selected.toUpperCase()] === Number(q.correct_option)
) {
  sc++;
}

  });

  setScore(sc);
  setShowModal(true);


  axios.post("http://localhost:8080/quize/submit-score", {
    quiz_id: selectedQuizId,
    score: sc,
    total_questions: quizData.length
  })
   .then(res => {
    console.log("Score saved:", res.data);
    homeScreen(); 
  })
  .catch(err => console.error("Score save failed:", err.message));
}

function getStatusColor(idx) {
  switch (questionStatus[idx]) {
    case "answered":
      return "green";
    case "skipped":
      return "red";
    case "review":
      return "violet";
    default:
      return "#ccc";
  }
}const circle = (color) => ({
  display: "inline-block",
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: color,
  marginRight: "5px",
});
const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds

useEffect(() => {
  if (!startQuiz) return;
  const interval = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        handleSubmitQuiz(); // auto submit
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(interval);
}, [startQuiz]);

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}




  function quizeWindow() {
    if (!startQuiz || quizData.length === 0) return null;

    const question = quizData[currentQuestionIndex];

    const options = [
      { key: "A", value: question.option_a },
      { key: "B", value: question.option_b },
      { key: "C", value: question.option_c },
      { key: "D", value: question.option_d },
    ];

     return (
  <div
    className="d-flex justify-content-center align-items-start"
    style={{ gap: "40px", padding: "40px", position: "relative", height: "100vh" }}
  >
    <div
      className="shadow-sm p-4 bg-white rounded position-relative"
      style={{
        height: "80vh",
        width: "700px",
        borderRadius: "16px",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontWeight: "bold",
          color: "#dc3545",
        }}
      >
        {formatTime(timeLeft)}
      </div>

      <p className="mb-1">Question {currentQuestionIndex + 1} of {quizData.length}</p>
      <h5 className="mb-4 fw-bold">{quizData[currentQuestionIndex]?.question_text}</h5>
      <div className="row">
        {["A", "B", "C", "D"].map((optKey) => {
          const optValue = quizData[currentQuestionIndex][`option_${optKey.toLowerCase()}`];
          return (
            <div key={optKey} className="col-6 mb-3">
              <button
                onClick={() => handleOptionClick(optKey)}
                className="btn w-100 text-start"
                style={{
                  backgroundColor: selectedOption === optKey ? "#a0e7a0" : "#f0f0f0",
                  fontWeight: selectedOption === optKey ? "bold" : "normal",
                  borderRadius: "8px",
                  border: "1px solid #ccc"
                }}
              >
                {optKey}. {optValue}
              </button>
            </div>
          );
        })}
      </div>

      <div className="d-flex flex-wrap gap-5 mt-5">
        <button className="btn btn-danger" onClick={skipQuestion}>Skip</button>
        <button className="btn btn-secondary" onClick={clearSelectedOption}>Clear Option</button>
        <button
          className="btn btn-outline-dark"
          onClick={() =>
            setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))
          }
        >
          Previous
        </button>
        <button className="btn btn-primary" onClick={goToNext}>Next</button>
        <button className="btn btn-success" onClick={handleSubmitQuiz}>Submit</button>
      </div>
    </div>
    <div
      className="shadow-sm p-3 bg-white rounded"
      style={{
        width: "90px",
        maxHeight: "400px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.15)"
      }}
    >
      {quizData.map((_, idx) => (
        <div
          key={idx}
          onClick={() => {
            setCurrentQuestionIndex(idx);
            setSelectedOption(selectedOptions[idx] || null);
          }}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: getStatusColor(idx),
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          {idx + 1}
        </div>
      ))}
    </div>
    {showModal && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "12px",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h4>Quiz Completed!</h4>
          <p>Your Score: {score} / {quizData.length}</p>
          <button className="btn btn-primary mt-3" onClick={() => {setShowModal(false);
            setShowQuizCard(true);
            setStartQuiz(false);

          }}>Close</button>
        </div>
      </div>
    )}
  </div>
);


  }
  return (
    <>
      <Navbar 
      setCreateQuiz = {setCreateQuiz}
      navStates = {()=>{
        setShowCreateQOptWindow(false);
        setShowQuizCard(true);
        setCreateQuiz(false);
        setEdit(false);
      }}
      />
      {getInpForNewQuiz()}
      {quizQOptWindow()}
      {showQuizCard && (
  <QuizCardList
    quizCardList={quizlist}
    setStartQuiz={setStartQuiz}
    setShowQuizCard={setShowQuizCard}
    setSelectedQuizId={setSelectedQuizId}
    setEdit={setEdit}
    setSelectedQuizName={setSelectedQuizName}
    setNumQuestions={setNumQuestions}
    setShowConfirm={setShowConfirm}
    setAddQs={setAddQs}
    setSelectedQuizNum={setSelectedQuizNum}
    setUpNum={setUpNum}
  />
)}
      {useEffect(() => {
        if (edit) {
          handleEditQuizBackEnd();
        }
      }, [edit])}
      {startQuiz && quizeWindow()}

      {!createQuiz && !showCreateQOptWindow && showQuizCard}
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
      <div>{addQs ? addQuestions() : null}</div>

      <div>
        <div>{edit && toBeUpdatedFormData && editform()}</div>
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
              href="https://www.instagram.com/?hl=en"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/in/yogesh-kumar-n-853084310/"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/YOGESH-08"
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
