
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GenerateQuestionsRequest } from "@/services/service";
import { X } from "lucide-react";

interface QuestionFormProps {
  onSubmit: (request: GenerateQuestionsRequest) => void;
  isLoading: boolean;
}

const experienceLevels = [
  "Entry Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Lead",
  "Architect",
];

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, isLoading }) => {
  const [jobRole, setJobRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobRole.trim()) {
      return;
    }
    
    if (!experienceLevel) {
      return;
    }
    
    if (skills.length === 0) {
      return;
    }
    
    onSubmit({
      jobRole,
      experienceLevel,
      skills,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Interview Questions</CardTitle>
        <CardDescription>
          Enter job details to create tailored technical interview questions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="job-role">Job Role</Label>
            <Input
              id="job-role"
              placeholder="e.g. Frontend Developer, DevOps Engineer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience-level">Experience Level</Label>
            <Select
              value={experienceLevel}
              onValueChange={setExperienceLevel}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="e.g. React, TypeScript, Node.js"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleAddSkill}
              />
              <Button 
                type="button" 
                onClick={handleAddSkill}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-muted-foreground hover:text-foreground focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Generating..." : "Generate Questions"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuestionForm;
