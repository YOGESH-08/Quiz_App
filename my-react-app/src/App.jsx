import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Wodal from "./Wodal";
// import Footer from "./footer";
import Boxes from "./Boxes";

function App() {
  let randomQuizes;
  const numberOption = [];
  for (let i = 1; i < 51; i++) {
    numberOption.push(i);
  }

  const [showTrivia, setshowTrivia] = useState(false);
  const [difficulty, setDifficulty] = useState("Select");
  const [numQuestions, setNumQuestions] = useState(1);
  const [showTriviaQuizQuestions, setShowTriviaQuizQuestions] = useState(false);
  const [triviaQuizData, setTriviaQuizData] = useState(null);

  function HomeScreen() {
    return (
      <div>
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


  function TriviaQuiz() {
  return (
    <div className="container">
      <div className="container1">Hello</div>
      <div className="container2">
        <div>World</div>
      </div>
      <div>Buttons</div>
    </div>
  );
}

  return (
    <>
      <Header />
      {showTriviaQuizQuestions ? TriviaQuiz(): HomeScreen()}
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
                onChange={(e) => setNumQuestions(e.target.value)}
              >
                {numberOption.map((number) => (
                  <option value={number} key={number}>
                    {number}
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
          setShowTriviaQuizQuestions(true);
          setTriviaQuizData(response.data);
        }}
      />
    </>
  );
}

export default App;
