import React from "react";

function QuizCardList({
  quizCardList,
  setStartQuiz,
  setShowQuizCard,
  setSelectedQuizId,
  setEdit,
  setSelectedQuizName,
  setNumQuestions,
  setShowConfirm,
  setAddQs,
  setSelectedQuizNum,
  setUpNum,
  handleEditQuizBackEnd, // <-- Receive the function as a prop
}) {
  if (quizCardList.length > 0) {
    return (
      <div className="d-flex flex-wrap justify-content-start gap-3">
        {quizCardList.map((Name, index) => (
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
              <li className="list-group-item">
                Score: {Name.score ?? "Not Attempted"}
              </li>
            </ul>
            <div className="card-body">
              <a
                className="card-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setStartQuiz(true);
                  setShowQuizCard(false);
                  setSelectedQuizId(Name.quiz_id);
                }}
              >
                Start
              </a>
              <a
                className="card-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedQuizId(Name.quiz_id);
                  setSelectedQuizName(Name.quiz_name);
                  setNumQuestions(Name.total_questions);
                  setUpNum(Name.total_questions); // <-- Set upNum here
                  setEdit(true);
                  handleEditQuizBackEnd(Name.quiz_id);
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
              <a
                className="card-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setAddQs(true);
                  setShowQuizCard(false);
                  setSelectedQuizId(Name.quiz_id);
                  setSelectedQuizNum(Name.total_questions);
                  setUpNum(Name.total_questions);
                }}
              >
                Add-Q
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>No Quizzes found!</p>;
  }
}

export default QuizCardList;