import React, { useEffect, useState } from "react";
import { useQuiz } from "../QuizHook";
import QuizQuestion from "../QuizQuestion";
import "./index.scss"

const index = () => {
  const { quizData, difficulty, questionsLimit, categories } = useQuiz(); //to get the quiz questions from the useQuiz hook
  const showCategories = () => {
    const categoriesStr = Object.entries(categories)
      .filter((category) => category[1])
      .map((category) => category[0])
      .toString();
    if (categoriesStr === ""){
      return "GENERAL KNOWLEDGE"
    }
    return categoriesStr.replaceAll("_"," ").replaceAll(",",",  ").toUpperCase()
  };
  useEffect(() => {
    console.log(
      showCategories()
    );
  }, []);
  return (
    <>
      <h1>Quiz</h1>
      <div className="details container">
        <h5>{difficulty.toUpperCase()}</h5>
        <h5>{questionsLimit} QUESTIONS TOTAL</h5>
        <h5>
          {showCategories()}
        </h5>
      </div>
      {quizData.map((question, index) => {
        return (
          <QuizQuestion
            questionNr={`Question ${index + 1}/${quizData.length}`}
            question={question.question}
            answers={[
              ...question.incorrectAnswers,
              question.correctAnswer,
            ].sort((a, b) => 0.5 - Math.random())}
            correctAnswer={question.correctAnswer}
            category={question.category}
            key={index}
          ></QuizQuestion>
        );
      })}
    </>
  );
};

export default index;
