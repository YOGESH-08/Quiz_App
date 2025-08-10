import React from "react";

function QuestionForm({
  currentQuestionIndex,
  numQuestions,
  formData,
  handleQuestiondetails,
  handleQuestionSubmit,
}) {
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
            {[1, 2, 3, 4].map((i) => (
              <div className="col-md-6 mb-3" key={i}>
                <label className="form-label">Option {i}</label>
                <input
                  type="text"
                  name={`option${i}`}
                  className="form-control"
                  value={formData[`option${i}`]}
                  onChange={handleQuestiondetails}
                  required
                />
              </div>
            ))}
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

export default QuestionForm;