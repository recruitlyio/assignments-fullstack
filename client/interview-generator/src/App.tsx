// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QuestionForm from "./components/QuestionForm";

function App() {
  return (
    <div className="min-h-screen bg-white-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Interview Generator</h1>
      <QuestionForm />
    </div>
  );
}

export default App
