import axios from "axios";
import React, {  useState } from "react";
import { Tooltip } from "react-tooltip";
import RulesPopup from "../RulesPopup";
import Popup from "reactjs-popup";
import { useQuiz } from "../Hooks/QuizHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const index = () => {
  const [openPopup, setOpenPopUp] = useState(false); // openPopup determines when to open and close the popup.
  const { setQuizData, questionsLimit, categories, difficulty } =
    useQuiz(); //this gets the quizData and setquizData method from our custom hook.
  const navigate = useNavigate();
  const client = axios.create({
    baseURL: "https://the-trivia-api.com/api/questions",
  });
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
        setQuizData(response.data);
      });
  };
  const closePopUp = () => {
    setOpenPopUp(false);
  };
  const handleStartQuiz = () => {
    fetchQuestions();
    setOpenPopUp((curState) => !curState);
  };

  return (
    <>
      <h1>Welcome to the quiz app</h1>
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

      <Tooltip id="playNowTooltip"></Tooltip>
      <Popup open={openPopup} closeOnDocumentClick onClose={closePopUp}>
        <RulesPopup></RulesPopup>
      </Popup>
    </>
  );
};

export default index;
