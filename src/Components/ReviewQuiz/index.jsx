import React, { useEffect } from "react";
import { useQuiz } from "../Hooks/QuizHook";
import "../Quiz/index.scss"; // use sass file from quiz component
import { showCategories } from "../Quiz"; //use of function defined in the quiz component.
import QuizQuestion from "../QuizQuestion";


const index = () => {
  const { quizData, difficulty, questionsLimit, categories, isQuizOver } =
    useQuiz(); //to get the quiz questions from the useQuiz hook
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  useEffect(()=>{
    console.log(quizData.randomAnswers,quizData)
  },[])
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
            isReviewPage={true}
            userAnswer={question.userAnswer}
            key={index}
          ></QuizQuestion>
        );
      })}
    </>
  );
};

export default index;
