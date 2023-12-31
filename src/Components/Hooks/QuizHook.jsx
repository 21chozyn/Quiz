import React, { createContext, useContext, useState } from "react";
const quiz_data = [
  {
    category: "Film & TV",
    id: "62573fe89da29df7b05f73b5",
    correctAnswer:
      "A group of thieves feel the pressure from the police when they leave a clue at their latest heist.",
    incorrectAnswers: [
      "A general accuses soldiers of cowardice and their commanding officer must defend them.",
      "The stepdaughter of a sadistic army officer escapes into an eerie fantasy world.",
      "An ex-prize fighter struggles to stand up to his corrupt union bosses.",
    ],
    question: "What is the plot of the movie Heat?",
    tags: ["film", "film_and_tv"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
    randomAnswers: [
      "A general accuses soldiers of cowardice and their commanding officer must defend them.",
      "The stepdaughter of a sadistic army officer escapes into an eerie fantasy world.",
      "An ex-prize fighter struggles to stand up to his corrupt union bosses.",
      "A group of thieves feel the pressure from the police when they leave a clue at their latest heist.",
    ],
    userAnswer:
      "A group of thieves feel the pressure from the police when they leave a clue at their latest heist.",
  },
  {
    category: "Geography",
    id: "623b57a1fd6c701a9211836d",
    correctAnswer: "Northern Ireland",
    incorrectAnswers: ["Greece", "New Zealand", "Vietnam"],
    question: "In which country would you find the Giant's Causeway?",
    tags: ["tourist_attractions", "natural_wonders", "geography"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
    randomAnswers: ["Greece", "New Zealand", "Northern Ireland", "Vietnam"],
    userAnswer:"Greece"
  },
  {
    category: "Arts & Literature",
    id: "622a1c397cc59eab6f950ef1",
    correctAnswer: "Charles Dickens",
    incorrectAnswers: ["Oscar Wilde", "Joseph Conrad", "Henryk Sienkiewicz"],
    question: "Which author wrote 'The Pickwick Papers'?",
    tags: ["literature", "arts_and_literature"],
    type: "Multiple Choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
    randomAnswers: [
      "Oscar Wilde",
      "Joseph Conrad",
      "Charles Dickens",
      "Henryk Sienkiewicz",
    ],
    userAnswer:"Oscar Wilde"
  },
  {
    category: "Food & Drink",
    id: "622a1c367cc59eab6f950282",
    correctAnswer: "Greece ",
    incorrectAnswers: ["India", "Morocco", "Russia"],
    question: "Where Might You Be Offered Ouzo?",
    tags: ["drink", "general_knowledge", "food_and_drink"],
    type: "Multiple Choice",
    difficulty: "medium",
    regions: [],
    isNiche: false,
    randomAnswers: ["Greece ", "India", "Morocco", "Russia"],
    userAnswer:"Greece "
  },
  {
    category: "Arts & Literature",
    id: "622a1c397cc59eab6f950e10",
    correctAnswer: "James Fenimore Cooper",
    incorrectAnswers: [
      "Edgar Rice Burroughs",
      "Jack London",
      "Edgar Allan Poe",
    ],
    question: "Which author wrote 'Leatherstocking Tales'?",
    tags: ["arts_and_literature"],
    type: "Multiple Choice",
    difficulty: "hard",
    regions: [],
    isNiche: false,
    randomAnswers: [
      "Edgar Rice Burroughs",
      "James Fenimore Cooper",
      "Jack London",
      "Edgar Allan Poe",
    ],
    userAnswer:"Edgar Rice Burroughs"
  },
];
const quizContext = createContext();
export const useQuiz = () => useContext(quizContext);
export default function QuizProvider({ children }) {
  const [quizData, setQuizData] = useState(
    sessionStorage.getItem("quizData") === null
      ? quiz_data
      : sessionStorage.getItem("quizData")
  );
  const [questionsLimit, setQuestionsLimit] = useState(5);
  const [correctQnsCount, setCorrectQnsCount] = useState(0);
  const [categories, setCategories] = useState({
    general_knowledge: true,
    film_and_tv: false,
    music: false,
    history: false,
    geography: false,
    arts_and_literature: false,
    sport_and_leisure: false,
    science: false,
    food_and_drink: false,
    society_and_culture: false,
  });
  const [difficulty, setDifficulty] = useState("medium");
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [percentage, setPercentage] = useState(null);
  return (
    <quizContext.Provider
      value={{
        quizData,
        setQuizData,
        questionsLimit,
        setQuestionsLimit,
        categories,
        setCategories,
        difficulty,
        setDifficulty,
        isQuizOver,
        setIsQuizOver,
        correctQnsCount,
        setCorrectQnsCount,
        percentage,
        setPercentage,
      }}
    >
      {children}
    </quizContext.Provider>
  );
}
