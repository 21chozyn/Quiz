import React from "react";
import CircularProgress from "../CircularProgress";
import { useQuiz } from "../Hooks/QuizHook";
import { useNavigate } from "react-router-dom";

const index = () => {
  const { questionsLimit, correctQnsCount } = useQuiz();
  const navigate = useNavigate();
  return (
    <div>
      <CircularProgress />
      <span>
        You answered {correctQnsCount} questions out of {questionsLimit}{" "}
        correct!!
      </span>
      <div className="toHome btn" onClick={() => navigate("/")}>
        Home
      </div>
    </div>
  );
};

export default index;
