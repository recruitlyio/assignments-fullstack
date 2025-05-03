import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { config } from '../../config/config';
import { Question } from '../../types';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);
    try {
      const response = await fetch(`${config.apiUrl}/questions/generate-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, experienceLevel })
      });

      const data = await response.json();
      setQuestions(data.questions || []);

      history("/questions");

      localStorage.setItem('questions', JSON.stringify(data.questions || []));
    } catch (error) {
      console.error('Error generating questions:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Technical Interview Question Generator</h1>

      <Card className="shadow-md">
        <CardContent className="space-y-4 flex flex-col gap-3">
          <TextField
            label="Job Requirements"
            multiline
            fullWidth
            rows={4}
            variant="outlined"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <TextField
            select
            label="Experience Level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="junior">Junior</MenuItem>
            <MenuItem value="mid">Mid</MenuItem>
            <MenuItem value="senior">Senior</MenuItem>
          </TextField>

          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? 'Generating...' : 'Generate Questions'}
          </Button>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Generated Questions</h2>
          {questions.map((q: Question, idx) => (
            <Card key={idx} className="border shadow-sm">
              <CardContent className="space-y-2">
                <p><strong>Question {idx + 1}:</strong> {q.question}</p>
                <p><strong>Skill Area:</strong> {q.skillArea}</p>
                <p><strong>Difficulty:</strong> {q.difficulty}</p>
                <p><strong>Evaluation Criteria:</strong> {q.evaluationCriteria.toString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}