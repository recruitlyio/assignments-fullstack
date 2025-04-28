// src/components/QuestionCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

interface QuestionCardProps {
  question: string;
  topic: string;
  difficulty: string;
  evaluationCriteria: string[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  topic,
  difficulty,
  evaluationCriteria,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" spacing={1} mb={1}>
          <Chip label={difficulty} color={difficulty === 'Easy' ? 'success' : difficulty === 'Medium' ? 'warning' : 'error'} size="small" />
          <Chip label={topic} variant="outlined" size="small" />
        </Stack>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          {question}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Evaluation Criteria:
        </Typography>
        <ul>
          {evaluationCriteria.map((criteria, index) => (
            <li key={index}>
              <Typography variant="body2">{criteria}</Typography>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
