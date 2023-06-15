import React, { useEffect, useState } from "react";
import { useQuiz } from "../Hooks/QuizHook";
import QuizQuestion from "../QuizQuestion";
import "./index.scss";

export const showCategories = (categories) => {
  const categoriesStr = Object.entries(categories)
    .filter((category) => category[1])
    .map((category) => category[0])
    .toString();
  if (categoriesStr === "") {
    return "GENERAL KNOWLEDGE";
  }
  return categoriesStr
    .replaceAll("_", " ")
    .replaceAll(",", ",  ")
    .toUpperCase();
};

const index = () => {
  const {
    quizData,
    difficulty,
    questionsLimit,
    categories,
    isQuizOver,
    setCorrectQnsCount
  } = useQuiz(); //to get the quiz questions from the useQuiz hook
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer



  useEffect(() => {
    !isQuizOver && (document.body.style.overflow = "hidden"); //to make the page nonscrollable
    setCorrectQnsCount(0)//to ensure that each quiz starts at 0
  }, []);

  return (
    <>
      <div className="header">
        <h1>Quiz</h1>
        <div className="details container">
          <h5>{difficulty.toUpperCase()}</h5>
          <h5>{questionsLimit} QUESTIONS TOTAL</h5>
          <h5>{showCategories(categories)}</h5>
        </div>
      </div>
      {quizData.map((question, index) => {
        return (
          <QuizQuestion
            questionNr={{ num: index + 1, total: quizData.length }}
            question={question.question}
            answers={question.randomAnswers}
            correctAnswer={question.correctAnswer}
            category={question.category}
            expiryTimestamp={time}
            timePerQuestion={30}
            isReviewPage={false}
            userAnswer={null}
            key={index}
          ></QuizQuestion>
        );
      })}
    </>
  );
};

export default index;
