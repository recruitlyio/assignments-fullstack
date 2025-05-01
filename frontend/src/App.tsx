// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import FormPage from './pages/form';

const App: React.FC = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<FormPage />} />

      </Routes>
    </Router>
  );
}

export default App;
