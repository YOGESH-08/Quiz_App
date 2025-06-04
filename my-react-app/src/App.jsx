import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Wodal from "./Wodal";
// import Footer from "./footer";
import Boxes from "./Boxes";
import he from "he";

function App() {
  const numberOption = [];
  for (let i = 1; i < 51; i++) {
    numberOption.push(i);
  }

  const DurationTiming = [];
  for (let j = 5; j < 61; j = j + 5) {
    DurationTiming.push(j);
  }

  const [showTrivia, setshowTrivia] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [numQuestions, setNumQuestions] = useState(1);
  const [showTriviaQuizQuestions, setShowTriviaQuizQuestions] = useState(false);
  const [triviaQuizData, setTriviaQuizData] = useState([]);
  // const [intervalId,setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [Duration, setDuration] = useState(0);
  const [sec, setSec] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!isRunning || sec <= 0) return;
    const id = setTimeout(() => {
      setSec((prev) => prev - 1000);
    }, 1000);
    return () => clearTimeout(id);
  }, [isRunning, sec]);

  function formatTime(milliseconds) {
    const h = Math.floor(milliseconds / (1000 * 60 * 60));
    const m = Math.floor((milliseconds / (1000 * 60)) % 60);
    const s = Math.floor((milliseconds / 1000) % 60);

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  function HomeScreen() {
    return (
      <div>
        <Header
          button1="Create Quiz"
          button2={isRunning ? formatTime(sec) : "Search Quiz"}
          button3="Profile"
          button4="Logout"
        />
        <p className="Random">Available Quizes</p>
        <div>
          <div className="boxes">
            <Boxes name="Box 1" />
            <Boxes name="Box 2" />
          </div>
        </div>
        <div>
          <p className="Random">Try Random Quiz</p>
          <div onClick={() => setshowTrivia(true)}>
            <div className="boxes">
              <Boxes name="Trivia Quiz" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  function questionCircles(num) {
    return [...Array(num)].map((_, i) => {
      return (
        <div className="q" id={`q-${i + 1}`} key={i}>
          {i + 1}
        </div>
      );
    });
  }

  function TriviaQuiz() {
    const currentQuestion = triviaQuizData[currentQuestionIndex];
    const options = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);
    return (
      <>
        <Header button2={isRunning ? formatTime(sec) : null} />
        <div className="container">
          <div className="container1">
            <div className="question">
              {triviaQuizData.map((questionData, i) => {
                if (currentQuestionIndex == i) {
                  return (
                    <>
                      <p key={i}>
                        {i + 1}.{he.decode(questionData.question)}
                      </p>
                      {options.map((option, i) => (
                        <label key={i} style={{ display: "block" }}>
                          <input
                            type="checkbox"
                            name={`q-${currentQuestionIndex}`}
                            value={option}
                          />
                          {he.decode(option)}
                        </label>
                      ))}
                    </>
                  );
                }
              })}
            </div>
          </div>
          <div className="container2">
            <div className="questioncircles">
              {questionCircles(parseInt(numQuestions))}
            </div>
          </div>
          <div className="TriviaButtons">
            <button
              className="Next"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
            >
              Next
            </button>
            <button
              className="Previous"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex - 1);
              }}
            >
              Previous
            </button>
            <button
              className="Skip"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
            >
              Skip
            </button>
            <button
              className="Review"
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              }}
            >
              Review Later
            </button>
            <button className="Submit">Submit</button>
          </div>
        </div>
      </>
    );
  }

  // useEffect(() => {
  //   if (triviaQuizData) {
  //     console.log("Updated quiz data:", triviaQuizData);
  //   }
  // }, [triviaQuizData]);

  return (
    <>
      {/* <Footer /> */}
      <Wodal
        show={showTrivia}
        onHide={() => setshowTrivia(false)}
        heading="Random Trivia Quiz"
        body={
          <form className="quizform" action="/quize/TriviaQuize" method="POST">
            <div>
              <label htmlFor="Difficultylevel">Select Difficulty level</label>
              <select
                name="categroy"
                id="Difficultylevel"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Select">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label htmlFor="Numberofquestions">
                Select Number of questions
              </label>
              <select
                name="categroy"
                id="Numberofquestions"
                onChange={(e) => {
                  const num = parseInt(e.target.value);
                  setNumQuestions(num);
                }}
              >
                {numberOption.map((number) => (
                  <option value={number} key={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="Duration">Select Minutes</label>
              <select
                name="Duration"
                id="Duration"
                onChange={(e) => {
                  const minutes = parseInt(e.target.value);
                  setDuration(minutes);
                  setSec(minutes * 60 * 1000);
                }}
              >
                {DurationTiming.map((min, i) => {
                  return (
                    <option key={i} value={min}>
                      {min}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        }
        endButton="Start"
        onClick={async () => {
          setshowTrivia(false);
          const response = await axios.post(
            "http://localhost:8080/quize/TriviaQuize",
            {
              difficulty,
              numQuestions,
            }
          );
          setIsRunning(true);
          setShowTriviaQuizQuestions(true);
          setTriviaQuizData(response.data.results);
        }}
      />
      {showTriviaQuizQuestions ? TriviaQuiz() : HomeScreen()}
    </>
  );
}

export default App;
