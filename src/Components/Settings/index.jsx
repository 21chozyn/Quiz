import React, { useEffect } from "react";
import { useQuiz } from "../QuizHook";
import "./index.scss";
const index = () => {
  const {
    quizData,
    setQuizData,
    questionsLimit,
    setQuestionsLimit,
    categories,
    setCategories,
    difficulty,
    setDifficulty,
  } = useQuiz();
  const allCategories = [
    "Arts & Literature",
    "Film & TV",
    "Food & Drink",
    "General Knowledge",
    "Geography",
    "History",
    "Music",
    "Science",
    "Society & Culture",
    "Sport & Leisure",
  ];
  const handleTxtChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)) {
      setQuestionsLimit(event.target.value);
    }
  };
  const handleCategoryChange = (event) => {
    setCategories({...categories,[event.target.name]:event.target.checked})

  };

  return (
    <>
      <h1>Settings</h1>
      <h2>Update your quiz preferences here!</h2>
      <div className="setting-category">
        <h5>Questions</h5>
        <label htmlFor="limit-txt-box">
          Update number of questions per session
          <input
            className="limit-txt-box"
            type="text"
            value={questionsLimit}
            onChange={handleTxtChange}
          />
        </label>
      </div>
      <div className="setting-category">
        <h5>Categories</h5>
        <form >
          {allCategories.map((category,index) => {
            const regex1 = / /g;
            const regex2 = /&/g;
            const formatedName = category
              .toLowerCase()
              .replace(regex1, "_")
              .replace(regex2, "and");
            return (
              <label key={index} className="category-label">
                <input
                  type="checkbox"
                  name={formatedName}
                  checked={categories[formatedName]}
                  onChange={handleCategoryChange}
                />
                {category}
              </label>
            );
          })}
        </form>
      </div>
    </>
  );
};

export default index;
