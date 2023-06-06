import React from 'react';
import CircularProgress from "../CircularProgress"
import { useQuiz } from '../Hooks/QuizHook';

const index = () => {
  const {questionsLimit,correctQnsCount }= useQuiz();
  return (
    <div>
      <CircularProgress />
      <span>You answered {correctQnsCount} questions out of {questionsLimit} correct!!</span>
    </div>
  )
}

export default index