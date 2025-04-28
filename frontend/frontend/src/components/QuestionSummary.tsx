

import { Box, Typography } from '@mui/material';

interface QuestionsSummaryProps {
  jobRole: string;
  experienceLevel: string;
  numberOfQuestions: number;
}

export default function QuestionsSummary({
  jobRole,
  experienceLevel,
  numberOfQuestions,
}: QuestionsSummaryProps) {
  return (
    <Box sx={{ my: 4 }}>
      {/* Heading */}
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Generated Questions ({numberOfQuestions} questions)
      </Typography>

      {/* Summary Card */}
      <Box
        sx={{
          backgroundColor: '#f5f9ff',
          border: '1px solid #d1e3ff',
          borderRadius: 2,
          p: 2,
          mb: 4,
          textAlign: 'left',
          maxWidth: 600,
          mx: -1,
        }}
      >
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          Job: {jobRole}
        </Typography>
        <Typography>
          Experience Level: {experienceLevel}
        </Typography>
      </Box>
    </Box>
  );
}
