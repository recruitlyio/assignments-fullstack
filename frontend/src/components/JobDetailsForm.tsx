import React from 'react';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Card, { CardHeader, CardTitle, CardContent, CardDescription } from './ui/Card';

interface JobDetailsProps {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  onJobTitleChange: (value: string) => void;
  onJobDescriptionChange: (value: string) => void;
  onCompanyNameChange: (value: string) => void;
}

const JobDetailsForm: React.FC<JobDetailsProps> = ({
  jobTitle,
  jobDescription,
  companyName,
  onJobTitleChange,
  onJobDescriptionChange,
  onCompanyNameChange,
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
        <CardDescription>
          Provide information about the job position to generate relevant questions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Job Title"
          placeholder="e.g., Senior Frontend Developer"
          value={jobTitle}
          onChange={(e) => onJobTitleChange(e.target.value)}
          required
        />
        
        <Input
          label="Company Name"
          placeholder="e.g., Acme Corp"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          required
        />
        
        <TextArea
          label="Job Description"
          placeholder="Describe the job role, responsibilities, and requirements in detail..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          helperText="The more detailed the job description, the more accurate the generated questions will be"
          required
        />
      </CardContent>
    </Card>
  );
};

export default JobDetailsForm;