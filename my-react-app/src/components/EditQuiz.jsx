import React from "react";

function EditQuiz({
  editingIndex,
  toBeUpdatedFormData,
  upName,
  upNum,
  upDuration,
  setUpName,
  setUpNum,
  setUpDuration,
  formData,
  handleQuestiondetails,
  handleEditSubmit,
  handleEditedQuestionSubmit,
  handleEditDeleteQuestionSubmit,
}) {
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
                min={upNum}
                max={upNum}
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

export default EditQuiz;