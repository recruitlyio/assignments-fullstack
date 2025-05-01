import React from 'react';
import Select from './ui/Select';
import Switch from './ui/Switch';
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';
import { DifficultySettings } from '../types/form';

interface QuestionSettingsProps {
  difficultySettings: DifficultySettings;
  practicalFocus: boolean;
  onDifficultyChange: (difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert') => void;
  onConsistencyChange: (value: boolean) => void;
  onPracticalFocusChange: (value: boolean) => void;
}

const QuestionSettings: React.FC<QuestionSettingsProps> = ({
  difficultySettings,
  practicalFocus,
  onDifficultyChange,
  onConsistencyChange,
  onPracticalFocusChange,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Question Generation Settings</CardTitle>
        <CardDescription>
          Configure how the AI should generate questions for this assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select
          label="Question Difficulty"
          value={difficultySettings.level}
          onChange={(e) => onDifficultyChange(e.target.value as any)}
          options={[
            { value: 'beginner', label: 'Beginner - Fundamental knowledge' },
            { value: 'intermediate', label: 'Intermediate - Applied knowledge' },
            { value: 'advanced', label: 'Advanced - Deep understanding' },
            { value: 'expert', label: 'Expert - Specialized expertise' },
          ]}
          helperText="Choose the overall difficulty level for generated questions"
        />
        
        <div className="pt-2">
          <Switch
            checked={difficultySettings.consistency}
            onChange={onConsistencyChange}
            label="Maintain consistent difficulty"
            description="Ensure questions have similar difficulty levels across different skill areas"
          />
        </div>
        
        <div className="pt-2">
          <Switch
            checked={practicalFocus}
            onChange={onPracticalFocusChange}
            label="Focus on practical application"
            description="Generate questions that test practical skills rather than theoretical knowledge"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionSettings;