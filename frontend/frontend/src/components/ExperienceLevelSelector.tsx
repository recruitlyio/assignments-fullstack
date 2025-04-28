

import { Box, Typography, Stack, Paper } from '@mui/material';

interface ExperienceLevelSelectorProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
}

const levels = [
  {
    label: 'Junior (0–2 years)',
    description: 'Basic knowledge of fundamental concepts',
    value: 'Junior',
  },
  {
    label: 'Mid-level (2–5 years)',
    description: 'Solid understanding of advanced topics',
    value: 'Mid-level',
  },
  {
    label: 'Senior (5+ years)',
    description: 'Deep expertise and architectural knowledge',
    value: 'Senior',
  },
];

export default function ExperienceLevelSelector({ selectedLevel, onSelect }: ExperienceLevelSelectorProps) {
  return (
    <Stack direction="row" spacing={2} mt={2}>
      {levels.map((level) => (
        <Paper
          key={level.value}
          elevation={selectedLevel === level.value ? 6 : 1}
          onClick={() => onSelect(level.value)}
          sx={{
            p: 2,
            flex: 1,
            borderRadius: 2,
            border: selectedLevel === level.value ? '2px solid #1976d2' : '1px solid #ccc',
            backgroundColor: selectedLevel === level.value ? '#e3f2fd' : 'transparent',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              borderColor: '#1976d2',
            },
          }}
        >
          <Typography fontWeight="bold">{level.label}</Typography>
          <Typography fontSize="small" color="textSecondary">
            {level.description}
          </Typography>
        </Paper>
      ))}
    </Stack>
  );
}
