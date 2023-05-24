import React, { useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faCheck,faXmark); //this removes annoying console message "cannot find icon"

const index = ({ questionNr, question, answers, correctAnswer, category }) => {
  const [className, setClassName] = useState("answer");
  const handleClick = (answer) => {
    setClassName("answer answered")
  };
  return (
    <div className="question--container">

      <em>{questionNr}</em>
      <h2>{question}</h2>
      {answers.map((answer) => (
        <div className={className} onClick={() => handleClick(answer)}>
          <div>{answer}</div>
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
