import React, { useEffect, useState } from "react";
import { useQuiz } from "../QuizHook";
import  QuizQuestion  from "../QuizQuestion";

const index = () => {
  const { quizData } = useQuiz(); //to get the quiz questions from the useQuiz hook
  const [question, setQuestion] = useState({});
  useEffect(() => {
    console.log(quizData[0])
  }, []);
  return (
    <>
      <div>Quiz</div>
      {quizData.map((question,index)=>{
        return (<QuizQuestion 
            questionNr={`Question ${index}/${quizData.length}`} 
            question={question.question}
            answers={[...question.incorrectAnswers,question.correctAnswer].sort((a,b)=>0.5-Math.random())}
            correctAnswer={question.correctAnswer}
            category={question.category}
            ></QuizQuestion>)
      })}
     
    </>
  );
};

export default index;
