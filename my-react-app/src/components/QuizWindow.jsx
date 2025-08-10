import React from "react";

function QuizWindow({
  quizData,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedOption,
  setSelectedOption,
  selectedOptions,
  setSelectedOptions,
  questionStatus,
  setQuestionStatus,
  handleOptionClick,
  clearSelectedOption,
  skipQuestion,
  goToNext,
  handleSubmitQuiz,
  showModal,
  setShowModal,
  score,
  timeLeft,
  formatTime,
  getStatusColor,
}) {
  if (!quizData || quizData.length === 0) return null;

  const question = quizData[currentQuestionIndex];

  return (
    <div
      className="d-flex justify-content-center align-items-start"
      style={{
        gap: "40px",
        padding: "40px",
        position: "relative",
        height: "100vh",
      }}
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

        <p className="mb-1">
          Question {currentQuestionIndex + 1} of {quizData.length}
        </p>
        <h5 className="mb-4 fw-bold">{question?.question_text}</h5>
        <div className="row">
          {["A", "B", "C", "D"].map((optKey) => {
            const optValue = question[`option_${optKey.toLowerCase()}`];
            return (
              <div key={optKey} className="col-6 mb-3">
                <button
                  onClick={() => handleOptionClick(optKey)}
                  className="btn w-100 text-start"
                  style={{
                    backgroundColor:
                      selectedOption === optKey ? "#a0e7a0" : "#f0f0f0",
                    fontWeight: selectedOption === optKey ? "bold" : "normal",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                >
                  {optKey}. {optValue}
                </button>
              </div>
            );
          })}
        </div>

        <div className="d-flex flex-wrap gap-5 mt-5">
          <button className="btn btn-danger" onClick={skipQuestion}>
            Skip
          </button>
          <button className="btn btn-secondary" onClick={clearSelectedOption}>
            Clear Option
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() =>
              setCurrentQuestionIndex(Math.max(currentQuestionIndex - 1, 0))
            }
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={goToNext}>
            Next
          </button>
          <button className="btn btn-success" onClick={handleSubmitQuiz}>
            Submit
          </button>
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
          boxShadow: "0 0 10px rgba(0,0,0,0.15)",
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
            <p>
              Your Score: {score} / {quizData.length}
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                setShowModal(false);
                setCurrentQuestionIndex(0);
                setSelectedOption(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizWindow;