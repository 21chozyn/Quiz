import React, { useEffect, useState } from "react";
import { useQuiz } from "../Hooks/QuizHook";
import QuizQuestion from "../QuizQuestion";
import "./index.scss";

const index = () => {
  const {
    quizData,
    difficulty,
    questionsLimit,
    categories,
    isQuizOver,
    setQuizData,
  } = useQuiz(); //to get the quiz questions from the useQuiz hook
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const showCategories = () => {
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
  const formatedQuestions = (theQuizData) => {
    //this function formats the quizData wih 1:randomised questions and answers so that the correct answer is in a random postion
    return theQuizData.map((question, index) => ({
      ...question,
      randomAnswers: [
        ...question.incorrectAnswers,
        question.correctAnswer,
      ].sort((a, b) => 0.5 - Math.random()),
    }));
  };
  useEffect(() => {
    !isQuizOver && (document.body.style.overflow = "hidden"); //to make the page nonscrollable
    // setQuizData(formatedQuestions(quizData)); //this adds a new key to quizdata called random answers
  }, []);

  return (
    <>
      <div className="header">
        <h1>Quiz</h1>
        <div className="details container">
          <h5>{difficulty.toUpperCase()}</h5>
          <h5>{questionsLimit} QUESTIONS TOTAL</h5>
          <h5>{showCategories()}</h5>
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
            key={index}
          ></QuizQuestion>
        );
      })}
    </>
  );
};

export default index;
