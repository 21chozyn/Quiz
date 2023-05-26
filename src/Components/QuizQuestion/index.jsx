import React, { useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCheck, faXmark); //this removes annoying console message "cannot find icon"

const index = ({ questionNr, question, answers, correctAnswer, category }) => {
  const [className, setClassName] = useState("answer notAnswered");
  const [qnIsAnswered, setQnIsAnswered] = useState(false);
  const handleClick = (event) => {
    !qnIsAnswered &&
      (event.target.style.backgroundColor =
        event.target.id === "correct" ? "#8a7fb5" : "red"); //to change color of the clicked div
    setClassName("answer answered");
    setQnIsAnswered(true);
  };
  return (
    <div className="question--container">
      <em>{questionNr}</em>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={className}
          onClick={handleClick}
          id={answer === correctAnswer ? "correct" : "wrong"} //to add a correct or false id to the div
        >
          <div className="answer-txt">{answer}</div>
          <FontAwesomeIcon
            icon={answer === correctAnswer ? faCheck : faXmark}
          />
        </div>
      ))}
      <h6>{category}</h6>
    </div>
  );
};

export default index;
