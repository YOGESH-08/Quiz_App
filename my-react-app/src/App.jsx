import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Wodal from "./Wodal";
import Boxes from "./Boxes";
import he from "he";

function App() {
  const numberOption = [];
  for (let i = 1; i < 51; i++) numberOption.push(i);

  const DurationTiming = [];
  for (let j = 5; j < 61; j += 5) DurationTiming.push(j);

  const [showTrivia, setshowTrivia] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [numQuestions, setNumQuestions] = useState(1);
  const [showTriviaQuizQuestions, setShowTriviaQuizQuestions] = useState(false);
  const [triviaQuizData, setTriviaQuizData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [Duration, setDuration] = useState(5);
  const [sec, setSec] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});
  const [noOfCorrect, setNoOfCorrect] = useState(0);
  const [noOfWrong, setNoOfWrong] = useState(0);
  const [score, setScore] = useState(0);

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
        <div className="boxes">
          <Boxes name="Box 1" />
          <Boxes name="Box 2" />
        </div>
        <p className="Random">Try Random Quiz</p>
        <div onClick={() => setshowTrivia(true)}>
          <div className="boxes">
            <Boxes name="Trivia Quiz" />
          </div>
        </div>
      </div>
    );
  }

  function questionCirclesColor(i) {
    if (i === currentQuestionIndex) return "qcurrent";
    if (userAnswer[i]) return "qanswered";
    return "q";
  }

  function questionCircles(num) {
    return [...Array(num)].map((_, i) => (
      <div className={questionCirclesColor(i)} id={`q-${i + 1}`} key={i}>
        {i + 1}
      </div>
    ));
  }

  function TriviaQuiz() {
    return (
      <>
        <Header button2={isRunning ? formatTime(sec) : null} />
        <div className="container">
          <div className="container1">
            <div className="question">
              {triviaQuizData.map((questionData, i) => {
                if (currentQuestionIndex === i) {
                  return (
                    <div key={i}>
                      <p>
                        {i + 1}.{he.decode(questionData.question)}
                      </p>
                      {questionData.options.map((option, index) => (
                        <label key={index} style={{ display: "block" }}>
                          <input
                            type="radio"
                            name={`question-${currentQuestionIndex}`}
                            value={option}
                            checked={
                              userAnswer[currentQuestionIndex] === option
                            }
                            onChange={() => {
                              setUserAnswer({
                                ...userAnswer,
                                [currentQuestionIndex]: option,
                              });
                            }}
                          />
                          {he.decode(option)}
                        </label>
                      ))}
                    </div>
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
              onClick={() =>
                setCurrentQuestionIndex((prev) => (prev + 1) % numQuestions)
              }
            >
              Next
            </button>
            <button
              className="Previous"
              onClick={() =>
                setCurrentQuestionIndex(
                  (prev) => (prev - 1 + numQuestions) % numQuestions
                )
              }
            >
              Previous
            </button>
            <button
              className="Submit"
              onClick={() => {
                let correct = 0;
                triviaQuizData.forEach((q, i) => {
                  if (userAnswer[i] === q.correct_answer) correct++;
                });
                setNoOfCorrect(correct);
                setNoOfWrong(numQuestions - correct);
                setScore(Math.round((correct / numQuestions) * 100));
                setIsRunning(false);
                
                alert(
                  `Quiz Submitted!\nCorrect: ${correct}\nWrong: ${
                    numQuestions - correct
                  }\nScore: ${Math.round((correct / numQuestions) * 100)}%`
                );
                setShowTriviaQuizQuestions(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Wodal
        show={showTrivia}
        onHide={() => setshowTrivia(false)}
        heading="Random Trivia Quiz"
        body={
          <form className="quizform" action="/quize/TriviaQuize" method="POST">
            <div>
              <label htmlFor="Difficultylevel">Select Difficulty level</label>
              <select
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
                id="Numberofquestions"
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
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
                id="Duration"
                onChange={(e) => {
                  const minutes = parseInt(e.target.value);
                  setDuration(minutes);
                  setSec(minutes * 60 * 1000);
                }}
              >
                {DurationTiming.map((min, i) => (
                  <option key={i} value={min}>
                    {min}
                  </option>
                ))}
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
          const processedData = response.data.results.map((q) => {
            const options = [...q.incorrect_answers, q.correct_answer].sort(
              () => Math.random() - 0.5
            );
            return { ...q, options };
          });
          setIsRunning(true);
          setShowTriviaQuizQuestions(true);
          setTriviaQuizData(processedData);
        }}
      />
      {showTriviaQuizQuestions ? TriviaQuiz() : HomeScreen()}
    </>
  );
}

export default App;
