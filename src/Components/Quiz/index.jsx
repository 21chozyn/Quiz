import React, { useEffect, useState } from "react";
import { useQuiz } from "../Hooks/QuizHook";
import QuizQuestion from "../QuizQuestion";
import "./index.scss";

const index = () => {
  const { quizData, difficulty, questionsLimit, categories, isQuizOver } =
    useQuiz(); //to get the quiz questions from the useQuiz hook
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
  useEffect(() => {
    !isQuizOver && (document.body.style.overflow = "hidden");
    console.log(showCategories());
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
            answers={[
              ...question.incorrectAnswers,
              question.correctAnswer,
            ].sort((a, b) => 0.5 - Math.random())}
            correctAnswer={question.correctAnswer}
            category={question.category}
            expiryTimeStamp={() => {
              const currentDate = new Date();
              currentDate.setSeconds(currentDate.getSeconds() + 100000);
              return currentDate;
            }}
            timePerQuestion={30}
            key={index}
          ></QuizQuestion>
        );
      })}
    </>
  );
};

export default index;
