import { Route, Routes } from "react-router";
import "./App.css";

import JobSeekerForm from "./pages/Form";
import { Questions } from "./pages/Questions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JobSeekerForm />} />
      <Route path="/questions" element={<Questions />} />
    </Routes>
  );
}
export default App;
