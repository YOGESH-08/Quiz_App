import React from "react";

function AddQuestions({
  toBeUpdatedFormData,
  editingIndex,
  selectedQuizNum,
  upNum,
  setUpNum,
  formData,
  handleQuestiondetails,
  handleAddQuestionSubmit,
  handleAddeddQuestionSubmit,
}) {
  return (
    <>
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h4 className="mb-4 text-center text-primary">
            Add Questions {toBeUpdatedFormData?.[editingIndex]?.quiz_name || " "}
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
                onChange={(e) => setUpNum(Number(e.target.value))}
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
              {[1, 2, 3, 4].map((i) => (
                <div className="col-md-6 mb-3" key={i}>
                  <label className="form-label">Option {i}</label>
                  <input
                    type="text"
                    name={`option${i}`}
                    className="form-control"
                    value={formData[`option${i}`] || ""}
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

export default AddQuestions;