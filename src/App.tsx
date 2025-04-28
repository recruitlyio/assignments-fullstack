import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { QuestionProvider } from './contexts/QuestionContext';
import Layout from './components/Layout/Layout';
import QuestionGenerator from './components/QuestionGenerator/QuestionGenerator';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <QuestionProvider>
        <Layout>
          <QuestionGenerator />
        </Layout>
      </QuestionProvider>
    </ThemeProvider>
  );
}

export default App;