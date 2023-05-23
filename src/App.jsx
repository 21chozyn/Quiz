import './App.scss'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"

function App() {

  return (
<Router>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </Router>
  )
}

export default App
