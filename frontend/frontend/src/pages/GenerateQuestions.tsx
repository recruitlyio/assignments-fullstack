import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import QuestionCard from '../components/QuestionCard';
import axios from '../../api/axiosInstance';
import { Question } from '../types/Question';
import QuestionsSummary from '../components/QuestionSummary';
import ExperienceLevelSelector from '../components/ExperienceLevelSelector'; 


const GenerateQuestions = () => {
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuestions = async () => {
    if (!jobRole || !experienceLevel) {
      setError('Please fill both fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/generate', {
        jobRole,
        experienceLevel,
      });

      setQuestions(response.data.questions || []);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Technical Interview Questions Generator
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Job Role"
          variant="outlined"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          fullWidth
        />
       <Box sx={{ width: '100%' }}>
  <Typography variant="subtitle1" gutterBottom>
    Experience Level
  </Typography>
  <ExperienceLevelSelector
    selectedLevel={experienceLevel}
    onSelect={(level) => setExperienceLevel(level)}
  />
</Box>
        <Button variant="contained" onClick={fetchQuestions}>
          GO
        </Button>
        {questions.length > 0 && (
          <IconButton color="primary" onClick={fetchQuestions}>
            <RefreshIcon />
          </IconButton>
        )}
      </Box>

      {/* Loading spinner */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <Typography color="error" align="center" my={2}>
          {error}
        </Typography>
      )}

      {/* Show Questions */}
      {!loading && questions.length > 0 && (
        <>
      
          <QuestionsSummary
            jobRole={jobRole}
            experienceLevel={experienceLevel}
            numberOfQuestions={questions.length}
          />

          
          <Stack spacing={2}>
            {questions.map((q, index) => (
              <Box
                key={index}
                sx={{
                  minHeight: 250,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <QuestionCard
                  question={q.question}
                  topic={q.topic}
                  difficulty={q.difficulty}
                  evaluationCriteria={q.evaluationCriteria}
                />
              </Box>
            ))}
          </Stack>
        </>
      )}

      {!loading && questions.length === 0 && !error && (
        <Typography align="center" color="textSecondary" mt={4}>
          No questions generated yet.
        </Typography>
      )}
    </Box>
  );
};

export default GenerateQuestions;
