import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import RulesPopup from "../RulesPopup";
import Popup from "reactjs-popup";
import { useQuiz } from "../QuizHook";


const index = () => {
  const [openPopup, setOpenPopUp] = useState(false); // openPopup determines when to open and close the popup.
  const {quizData,setQuizData}= useQuiz() //this gets the quizData and setquizData method from our custom hook.

  const fetchQuestions = () => {
    // Fetch questions on function call
    axios
      .get("https://the-trivia-api.com/v2/questions")
      .then((response) => {
        // Set the quizdata state with the fetched data
        setQuizData(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
  const closePopUp =()=>{
    setOpenPopUp(false);

  }
  const handleStartQuiz = () => {
    fetchQuestions();
    setOpenPopUp((curState)=>!curState)
  };
  useEffect(()=>{
    console.log(quizData)
  },[quizData])

  return (
    <>
      <h1>Welcome to the quiz app</h1>
      <button
        data-tooltip-id="playNowTooltip"
        data-tooltip-content="Tip: edit difficulty and categories in settings!"
        onClick={handleStartQuiz}
      >
        Play now
      </button>
      <Tooltip id="playNowTooltip"></Tooltip>
      <Popup open={openPopup} closeOnDocumentClick onClose={closePopUp}>
        <RulesPopup></RulesPopup>
      </Popup>
    </>
  );
};

export default index;
