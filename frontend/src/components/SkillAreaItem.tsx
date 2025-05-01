import React from 'react';
import { Trash2 } from 'lucide-react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Select from './ui/Select';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from './ui/Card';
import Button from './ui/Button';
import { SkillArea } from '../types/form';

interface SkillAreaItemProps {
  skillArea: SkillArea;
  onChange: (updatedSkillArea: SkillArea) => void;
  onRemove: () => void;
  index: number;
}

const SkillAreaItem: React.FC<SkillAreaItemProps> = ({
  skillArea,
  onChange,
  onRemove,
  index,
}) => {
  const handleChange = (
    field: keyof SkillArea,
    value: string | number | boolean
  ) => {
    onChange({
      ...skillArea,
      [field]: value,
    });
  };

  return (
    <Card className="mb-6 animate-fadeIn">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Skill Area #{index + 1}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            icon={<Trash2 className="h-4 w-4" />}
            aria-label="Remove skill area"
          >
            Remove
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Skill Name"
          placeholder="e.g., JavaScript Programming"
          value={skillArea.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        
        <TextArea
          label="Skill Description"
          placeholder="Describe what this skill involves and why it's important for the role"
          value={skillArea.description}
          onChange={(e) => handleChange('description', e.target.value)}
          required
        />
        
        <Select
          label="Importance Level"
          value={skillArea.importance}
          onChange={(e) => handleChange('importance', e.target.value)}
          options={[
            { value: 'high', label: 'High - Critical for the role' },
            { value: 'medium', label: 'Medium - Important but not critical' },
            { value: 'low', label: 'Low - Nice to have' },
          ]}
          required
        />
        
        <TextArea
          label="Evaluation Criteria"
          placeholder="Specify how answers to questions in this skill area should be evaluated"
          value={skillArea.evaluationCriteria}
          onChange={(e) => handleChange('evaluationCriteria', e.target.value)}
          helperText="Describe what makes a good answer for questions in this skill area"
          required
        />
      </CardContent>
    </Card>
  );
};

export default SkillAreaItem;