import React from "react";

function QuizForm({
  quizName,
  numQuestions,
  duration,
  setQuizName,
  setNumQuestions,
  setDuration,
  handleSubmit,
}) {
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

export default QuizForm;