import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import RulesPopup from "../RulesPopup";
import Popup from "reactjs-popup";
import { useQuiz } from "../Hooks/QuizHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export const saveDataToSession = (quizData) => {
  // exported to be usable in any component that wishes to save quizdata
  localStorage.setItem("quizData", quizData);
};
const index = () => {
  const [openPopup, setOpenPopUp] = useState(false); // openPopup determines when to open and close the popup.
  const { setQuizData, questionsLimit, categories, difficulty, quizData } =
    useQuiz(); //this gets the quizData and setquizData method from our custom hook.
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "https://the-trivia-api.com/api/questions",
  });
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === null
      ? "light"
      : localStorage.getItem("theme")
    // this is to get the current theme stored in localstorage
  ); //this is state for dark and light mode
  const fetchQuestions = () => {
    // Fetch questions on function call
    const categoriesStr = Object.entries(categories) //this takes all the selected categories and turns it into a string
      .filter((category) => category[1])
      .map((category) => category[0])
      .join(",");

    client
      .get(
        `?categories=${categoriesStr}&limit=${questionsLimit}&difficulty=${difficulty}`
      )
      .then((response) => {
        setQuizData(formatedQuestions(response.data)); //this adds a new key to quizdata called random answers
      });
  };
  const closePopUp = () => {
    setOpenPopUp(false);
  };
  const handleStartQuiz = () => {
    fetchQuestions();
    setOpenPopUp((curState) => !curState);
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
    //this updates the body classname with corresponding theme
    document.body.className = theme;
  }, [theme]);
  useEffect(() => {
    //this useeffect saves quizdata to localstorage when comp unmounts
    return () => {
      saveDataToSession(quizData);
    };
  }, []);
  return (
    <>
      <div className="home-container">
        <h1>Hi, lets play a quiz</h1>
        <div className="Buttons-container">
          <div
            className="playNow btn"
            data-tooltip-id="playNowTooltip"
            data-tooltip-content="Tip: edit difficulty and categories in settings!"
            onClick={handleStartQuiz}
          >
            Play now
          </div>
          <div
            className="toSettings btn"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
      </div>

      <Tooltip id="playNowTooltip"></Tooltip>
      <Popup open={openPopup} closeOnDocumentClick onClose={closePopUp}>
        <RulesPopup></RulesPopup>
      </Popup>
    </>
  );
};

export default index;
