import React from "react";
import CircularProgress from "../CircularProgress";
import { useQuiz } from "../Hooks/QuizHook";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { showCategories } from "../Quiz";

const index = () => {
  const { questionsLimit, correctQnsCount, difficulty, categories } = useQuiz();
  const navigate = useNavigate();
  
  return (
    <div className="results-container">
      <CircularProgress />
      <span>
        You answered {correctQnsCount}{" "}
        {correctQnsCount == 1 ? "question" : "questions"} out of{" "}
        {questionsLimit} correct!!
      </span>
      <br />
      <span>Difficulty : {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
      <span>Categories : {showCategories(categories)}</span>
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
