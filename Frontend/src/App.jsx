import React from 'react'
import TalkToElla from './TalkToElla'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
   <>
     
      
      <BrowserRouter>

      <Routes>
        <Route path="/" element={< TalkToElla />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App