import React from "react";
import "./index.scss";
const index = ({ questionNr, question, answers, correctAnswer, category }) => {
    const handleClick = ()=>{

    }
  return (
    <div className="question--container">
      <em>{questionNr}</em>
      <h2>{question}</h2>
      {answers.map((answer) => (
        <div className="answer" onClick={handleClick}>{answer}</div>
      ))}
      <h6>{category}</h6>
    </div>
  );
};

export default index;
