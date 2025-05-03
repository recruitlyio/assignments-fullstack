import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import QuestionDetailsPage from "./components/QuestionDetailsPage/QuestionsDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions" element={<QuestionDetailsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App