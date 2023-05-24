import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import Quiz from "./Components/Quiz";
function App() {

  return (
<Router>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/quiz' element={<Quiz/>}/>
      </Routes>
      
    </Router>
  )
}

export default App
