import React, { useEffect, useState } from "react";
import "./index.scss";
import { useRef } from "react";
import { useQuiz } from "../Hooks/QuizHook";

const index = () => {
  const { correctQnsCount, questionsLimit,percentage, setPercentage } = useQuiz(); //to get the num of qns correctly answered and total qns answered;
  const [progressStartValue, setProgressStartValue] = useState(0);
  let speed = 50; //this is speed in ms which affects animation speed;
  const progressIntervalId = useRef(null); // Create a ref to store the progress interval ID
  useEffect(()=>{
    setPercentage(Math.round((correctQnsCount * 100) / questionsLimit)) // this updates useQuiz with the calculated percentage
    progressIntervalId.current = setInterval(() => {
      setProgressStartValue((prev) => prev + 1);
    }, speed);
    return ()=>{
      clearInterval(progressIntervalId.current);
    }
  },[])
  useEffect(() => {
    // progressIntervalId.current = setInterval(() => {
    //   setProgressStartValue((prev) => prev + 1);
    // }, speed);
    // return ()=>{
    //   clearInterval(progressIntervalId.current);
    // }
  }, []);
  useEffect(() => {
    if (progressStartValue == percentage) {
      clearInterval(progressIntervalId.current); // Clears progress setInterval when startvalue reaches end value
    }
  }, [progressStartValue,percentage]);
  return (
    <>
      <div className="progressbar-container">
        <div
          className="circular-progress"
          style={{
            background: `conic-gradient(#7d2ae8 ${
              progressStartValue * 3.6
            }deg, #ededed 0deg)`,
          }}
        >
          <span className="progress-value">{`${progressStartValue}%`}</span>
        </div>
      </div>
    </>
  );
};

export default index;
