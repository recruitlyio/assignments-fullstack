import React from 'react';
import TextArea from './ui/TextArea';
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';

interface AdditionalNotesProps {
  additionalNotes: string;
  onChange: (value: string) => void;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({
  additionalNotes,
  onChange,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Additional Notes</CardTitle>
        <CardDescription>
          Any specific requirements or information to guide question generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TextArea
          placeholder="Add any specific instructions for the AI to consider when generating questions..."
          value={additionalNotes}
          onChange={(e) => onChange(e.target.value)}
          helperText="Optional: Include any additional context that might help generate better questions"
        />
      </CardContent>
    </Card>
  );
};

export default AdditionalNotes;