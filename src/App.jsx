import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import Settings from "./Components/Settings";
import Results from "./Components/Results";
import ReviewQuiz from "./Components/ReviewQuiz";

function App() {
  return (
    <Router  basename={import.meta.env.DEV ? '/' : '/Quiz/'}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/results" element={<Results />} />
        <Route path="/reviewQuiz" element={<ReviewQuiz />} />

      </Routes>
    </Router>
  );
}

export default App;
