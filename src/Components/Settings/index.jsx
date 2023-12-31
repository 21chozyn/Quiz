import React, { useEffect, useState } from "react";
import { useQuiz } from "../Hooks/QuizHook";
import "./index.scss";
import { useNavigate } from "react-router-dom";
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
]; // these are all the availablecategories in the trivia api
const index = () => {
  const {
    questionsLimit,
    setQuestionsLimit,
    categories,
    setCategories,
    difficulty,
    setDifficulty,
  } = useQuiz(); // this is to get the state variables from useQuiz custom hook
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === null
      ? "light"
      : localStorage.getItem("theme")
    // this is to get the current theme stored in localstorage
  ); //this is state for dark and light mode
  const navigate = useNavigate();
  const handleTxtChange = (event) => {
    //this function is responsible for changing number of questions per session
    const regex = /^[0-9\b]+$/;
    if (regex.test(event.target.value)) {
      setQuestionsLimit(event.target.value);
    }
  };
  const handleCategoryChange = (event) => {
    //this function is responsible for changing wether or not a category will be present in the session
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };
  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme); //this changes the them to the selected choice
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    console.log(categories);
  }, [categories]);
  useEffect(() => {
    //this updates the body classname with corresponding theme
    document.body.className = theme;
  }, [theme]);

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
            id="limit-txt-box"
            type="number"
            max={50}
            min={5}
            value={questionsLimit}
            onChange={handleTxtChange}
          />
        </label>
      </div>
      <div className="setting-category">
        <h5>Categories</h5>
        <div>
          {allCategories.map((category, index) => {
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
        </div>
      </div>
      <div className="setting-category">
        <h5>Difficulty</h5>
        <div>
          <label>
            <input
              type="radio"
              name="easy"
              value="easy"
              checked={difficulty === "easy"}
              onChange={handleDifficultyChange}
            />
            Easy
          </label>
          <label>
            <input
              type="radio"
              name="medium"
              value="medium"
              checked={difficulty === "medium"}
              onChange={handleDifficultyChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="hard"
              value="hard"
              checked={difficulty === "hard"}
              onChange={handleDifficultyChange}
            />
            Hard
          </label>
        </div>
      </div>
      <div className="setting-category">
        <h5>Theme</h5>
        <div>
          <label>
            Toggle {theme === "dark" ? "Light" : "Dark"} mode on.
            <input
              className="toggle"
              type="checkbox"
              name="dark"
              value="dark"
              checked={theme === "dark"}
              onChange={handleThemeChange}
            />
            <span className="check"></span>
          </label>
        </div>
      </div>
      <div
        className="toHome btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </div>
    </>
  );
};

export default index;
