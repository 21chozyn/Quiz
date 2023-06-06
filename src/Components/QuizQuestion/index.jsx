import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useTimer } from "react-timer-hook";
import { useIsVisible } from "../Hooks/useIsVisible";
import { useQuiz } from "../Hooks/QuizHook";
import { useNavigate } from "react-router-dom";
library.add(faCheck, faXmark); //this removes annoying console message "cannot find icon"

const index = ({
  questionNr,
  question,
  answers,
  correctAnswer,
  category,
  expiryTimeStamp,
  timePerQuestion,
}) => {
  const curQuizRef = useRef();
  const isVisible = useIsVisible(curQuizRef);
  const [answClassName, setAnswClassName] = useState("answer notAnswered");
  const [progressBarClassName, setProgressBarClassName] = useState("");
  const [qnIsAnswered, setQnIsAnswered] = useState(false); // this state is used to stop user from clicking answers twice
  const { seconds, start, pause, restart } = useTimer({
    expiryTimeStamp,
    onExpire: () => quizQnFinished(questionNr.num),
  });
  const { isQuizOver, setIsQuizOver, setCorrectQnsCount } = useQuiz(); // to get and set the current state of quiz
  const navigate = useNavigate();

  const handleClick = (event) => {
    !qnIsAnswered &&
      (event.target.style.backgroundColor =
        event.target.id === "correct" ? "#8a7fb5" : "red"); //to change color of the clicked div
    event.target.id === "correct" && setCorrectQnsCount((prev) => prev + 1);
    setAnswClassName("answer answered");
    setQnIsAnswered(true);
    quizQnFinished(questionNr.num);
  };
  const startTimer = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    restart(time);
  };
  const quizQnFinished = (curQuizNum) => {
    //this function is called when a question has been answered or time is up
    pause();
    setAnswClassName("answer answered"); // to show wrong and correct answers
    setProgressBarClassName(""); //to remove the progress bar
    const delay = setTimeout(() => {
      const nextQn = document.getElementById(`question${curQuizNum + 1}`);
      if (nextQn) {
        // 👇 Will scroll smoothly to the top of the next section
        nextQn.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      } else {
        setIsQuizOver(true);
        console.log("quiz is finished");
        navigate("/results");
      }
    }, 2000);
  };
  useEffect(() => {
    isQuizOver && (document.body.style.overflow = "scroll");
  }, [isQuizOver]);
  useEffect(() => {
    if (isVisible) {
      startTimer();
      setProgressBarClassName("progress-container"); //this starts the progressBar animation as it gets into viewport
    }
  }, [isVisible]);
  return (
    <div
      className="question--container"
      id={`question${questionNr.num}`}
      style={{
        marginBottom: (window.innerHeight - 400) / 2,
        marginTop: (window.innerHeight - 400) / 2,
      }}
    >
      <em>{`Question ${questionNr.num}/${questionNr.total}`}</em>
      <h2>{question}</h2>
      {answers.map((answer, index) => (
        <div
          key={index}
          className={answClassName}
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
      <h6 className="time-left">Time Left: {seconds} seconds</h6>
      <div className={progressBarClassName} ref={curQuizRef}>
        <progress
          className="timer"
          value={timePerQuestion - seconds}
          max={timePerQuestion}
        />
      </div>
    </div>
  );
};

export default index;
