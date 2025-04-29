import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import ChatPage from "./pages/chat";

const App = () => {
   return (
      <Routes>
         <Route index element={<HomePage />} />
         <Route path="chat/:interviewId" element={<ChatPage />} />
      </Routes>
   );
};

export default App;
