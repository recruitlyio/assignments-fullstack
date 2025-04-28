import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GenerateQuestions from './pages/GenerateQuestions';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<GenerateQuestions />} />
        
      </Routes>
    </>
  );
}

export default App;
