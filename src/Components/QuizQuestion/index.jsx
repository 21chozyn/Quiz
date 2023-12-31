import React, { useEffect, useRef, useState } from "react";
import QuitQuizPopUp from "../QuitQuizPopUp";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useTimer } from "react-timer-hook";
import { useIsVisible } from "../Hooks/useIsVisible";
import { useQuiz } from "../Hooks/QuizHook";
import { useNavigate } from "react-router-dom";
import { saveDataToSession } from "../Home";
import Popup from "reactjs-popup";
library.add(faCheck, faXmark); //this removes annoying console message "cannot find icon"

const index = ({
  questionNr,
  question,
  answers,
  correctAnswer,
  category,
  expiryTimestamp,
  timePerQuestion,
  isReviewPage,
  userAnswer,
}) => {
  const curQuizRef = useRef();
  const thisRef = useRef();
  const isVisible = useIsVisible(isReviewPage ? thisRef : curQuizRef);
  const [answClassName, setAnswClassName] = useState(
    isReviewPage ? `answer answered ${questionNr.num}` : "answer notAnswered"
  );
  const [progressBarClassName, setProgressBarClassName] = useState("");
  const [qnIsAnswered, setQnIsAnswered] = useState(false); // this state is used to stop user from clicking answers twice
  const [openPopup, setOpenPopUp] = useState(false); // this state determines when to open quit popup
  const [canScroll, setCanScroll] = useState(true); // this state is used to prevent scrollintoView of an already answered qn.
  const { seconds, pause, restart, start } = useTimer({
    expiryTimestamp,
    onExpire: () =>
      isReviewPage
        ? () => {
            return console.log("do nothing");
          }
        : quizQnFinished(questionNr.num),
  });
  const {
    isQuizOver,
    setIsQuizOver,
    setCorrectQnsCount,
    setQuizData,
    quizData,
  } = useQuiz(); // to get and set the current state of quiz
  const navigate = useNavigate();
  const quizQnIntervalId = useRef(null); // Create a ref to store the quiz qn interval ID
  const addUserAnswer = (userAnswer) => {
    //this function adds answer provided by user to the quizdata
    const newQuizData = quizData.map((curQn, index) => {
      if (index + 1 !== questionNr.num) return curQn;
      return {
        ...curQn,
        userAnswer: userAnswer,
      };
    });
    setQuizData(newQuizData);
  };

  const handleAnswClick = (event) => {
    if (!isReviewPage && !qnIsAnswered) {
      event.target.style.backgroundColor =
        event.target.id === "correct" ? "#8a7fb5" : "red"; //to change color of the clicked div
      event.target.id === "correct" && setCorrectQnsCount((prev) => prev + 1);
      const answer = event.target.querySelector("div").textContent; //this is to get the text inside the inner div
      addUserAnswer(answer);
      setAnswClassName(`answer answered ${questionNr.num}`);
      setQnIsAnswered(true);
      quizQnFinished(questionNr.num);
    }
  };
  const handleQuit = () => {
    setProgressBarClassName(""); //to remove the progress bar
    if (isReviewPage) navigate("/results");
    else {
      pause();
      setOpenPopUp(true);
    }
  };
  const startTimer = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15);
    restart(time);
  };
  const quizQnFinished = (curQuizNum) => {
    //this function is called when a question has been answered or time is up
    if (isReviewPage) return; //prevent function from running if this is review page
    pause();
    setAnswClassName(`answer answered ${questionNr.num}`); // to show wrong and correct answers
    setProgressBarClassName(""); //to remove the progress bar
    quizQnIntervalId.current = setTimeout(() => {
      const nextQn = document.getElementById(`question${curQuizNum + 1}`);
      if (nextQn) {
        console.log("nextqn ", nextQn);
        canScroll &&
          nextQn.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        setCanScroll(false);
      } else {
        console.log("quiz is finished");

        setIsQuizOver(true);
        navigate("/results");
      }
    }, 2000);
  };
  const closePopUp = () => {
    start();
    setOpenPopUp(false);
  };
  useEffect(() => {
    isQuizOver && (document.body.style.overflow = "scroll");
  }, [isQuizOver]);
  useEffect(() => {
    if (!isReviewPage && isVisible) {
      startTimer();
      setProgressBarClassName("progress-container"); //this starts the progressBar animation as it gets into viewport
    }
  }, [isVisible]);
  useEffect(() => {
    //this useefeect clears the useinterval on component unmount
    return () => {
      clearInterval(quizQnIntervalId.current);
    };
  }, []);
  useEffect(() => {
    //this useeffect saves quizdata to localstorage when comp unmounts
    //this useeffect also styles the answers if isreviewpage
    const highlightAnswers = () => {
      const collection = document.getElementsByClassName(
        `answer answered ${questionNr.num}` //this is neccessary to get answers of only this question
      );
      const answerElements = Array.from(collection); //to get these into an array
      let usersAns = answerElements.reduce((acc, curElement) => {
        //this gives us the div which contains the users original answer
        if (curElement.querySelector("div").innerText === userAnswer) {
          return curElement;
        }
        return acc;
      }, answerElements[0]);
      usersAns.style.backgroundColor =
        usersAns.id === "correct" //to style the div according to weather users answer is correct or not
          ? "#8a7fb5"
          : "red";
    };
    isReviewPage && highlightAnswers(); //only call this function if we are on the quizquestion only
    return () => {
      saveDataToSession(quizData);
    };
  }, []);
  return (
    <div
      className="question--container"
      id={`question${questionNr.num}`}
      ref={thisRef}
    >
      <em>{`Question ${questionNr.num}/${questionNr.total}`}</em>
      <h2>{question}</h2>
      <div className="answers--container">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={answClassName}
            onClick={handleAnswClick}
            id={answer === correctAnswer ? "correct" : "wrong"} //to add a correct or false id to the div
          >
            <div className="answer-txt">{answer}</div>
            <FontAwesomeIcon
              icon={answer === correctAnswer ? faCheck : faXmark}
            />
          </div>
        ))}
      </div>
      <div className="last-sect-container">
        <h6 className="category">{category}</h6>
        <div className="quit btn" onClick={handleQuit}>
          {isReviewPage ? "Show Results" : "Quit"}
        </div>
      </div>

      {!isReviewPage && (
        <>
          <h6 className="time-left">Time Left: {seconds} seconds</h6>
          {seconds < 10 && (
            <h6 className="time-left top" >Time Left: {seconds} seconds!!</h6>
          )}
          <div className={progressBarClassName} ref={curQuizRef}>
            <progress
              className="timer"
              value={timePerQuestion - seconds}
              max={timePerQuestion}
            />
          </div>
        </>
      )}
      <Popup open={openPopup} closeOnDocumentClick onClose={closePopUp}>
        <QuitQuizPopUp></QuitQuizPopUp>
      </Popup>
    </div>
  );
};

export default index;
