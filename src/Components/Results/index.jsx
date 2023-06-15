import React from "react";
import CircularProgress from "../CircularProgress";
import { useQuiz } from "../Hooks/QuizHook";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const index = () => {
  const { questionsLimit, correctQnsCount } = useQuiz();
  const navigate = useNavigate();
  return (
    <div className="results-container">
      <CircularProgress />
      <span>
        You answered {correctQnsCount} {correctQnsCount==1?"question":"questions"} out of {questionsLimit}{" "}
        correct!!
      </span>
      <div className="toHome btn" onClick={() => navigate("/")}>
        Home
      </div>
      <div className="toQuizReview btn" onClick={() => navigate("/reviewQuiz")}>
        Review questions
      </div>
    </div>
  );
};

export default index;
