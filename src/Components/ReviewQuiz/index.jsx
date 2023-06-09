import React from 'react'
import { useQuiz } from "../Hooks/QuizHook";

const index = () => {
  const {quizData} = useQuiz();

  return (
    <div>review</div>
  )
}

export default index