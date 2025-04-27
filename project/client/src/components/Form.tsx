import { useState } from "react";
import { FormData, ExperienceLevel } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelectInput } from "./MultiSelectInput";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
  onReset?: () => void;
  showReset?: boolean;
}

export function Form({
  onSubmit,
  loading,
  onReset,
  showReset = false,
}: FormProps) {
  const [formState, setFormState] = useState<FormData>({
    jobTitle: "",
    primarySkills: [],
    experienceLevel: "Mid",
    numberOfQuestions: 5,
    skillAreas: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formState.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (formState.primarySkills.length === 0) {
      newErrors.primarySkills = "At least one primary skill is required";
    }
    if (formState.skillAreas.length === 0) {
      newErrors.skillAreas = "At least one skill area is required";
    }
    if (formState.numberOfQuestions < 1 || formState.numberOfQuestions > 10) {
      newErrors.numberOfQuestions =
        "Number of questions must be between 1 and 10";
    }

    setErrors(newErrors);

    // If no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formState);
    }
  };

  const handleReset = () => {
    setFormState({
      jobTitle: "",
      primarySkills: [],
      experienceLevel: "Mid",
      numberOfQuestions: 5,
      skillAreas: [],
    });
    setErrors({});
    if (onReset) onReset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Technical Interview Question Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="e.g. Frontend Developer"
              value={formState.jobTitle}
              onChange={(e) =>
                setFormState({ ...formState, jobTitle: e.target.value })
              }
              className={errors.jobTitle ? "border-destructive" : ""}
            />
            {errors.jobTitle && (
              <p className="text-sm text-destructive">{errors.jobTitle}</p>
            )}
          </div>

          <MultiSelectInput
            label="Primary Skills"
            value={formState.primarySkills}
            onChange={(value) =>
              setFormState({ ...formState, primarySkills: value })
            }
            placeholder="e.g. React, TypeScript, Node.js"
            className={errors.primarySkills ? "border-destructive" : ""}
          />
          {errors.primarySkills && (
            <p className="text-sm text-destructive">{errors.primarySkills}</p>
          )}

          <div className="space-y-2">
            <Label htmlFor="experienceLevel">Experience Level</Label>
            <Select
              value={formState.experienceLevel}
              onValueChange={(value: ExperienceLevel) =>
                setFormState({ ...formState, experienceLevel: value })
              }
            >
              <SelectTrigger id="experienceLevel">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid">Mid-level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfQuestions">Number of Questions</Label>
            <Input
              id="numberOfQuestions"
              type="number"
              min={1}
              max={20}
              value={formState.numberOfQuestions}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  numberOfQuestions: parseInt(e.target.value) || 0,
                })
              }
              className={errors.numberOfQuestions ? "border-destructive" : ""}
            />
            {errors.numberOfQuestions && (
              <p className="text-sm text-destructive">
                {errors.numberOfQuestions}
              </p>
            )}
          </div>

          <MultiSelectInput
            label="Skill Areas"
            value={formState.skillAreas}
            onChange={(value) =>
              setFormState({ ...formState, skillAreas: value })
            }
            placeholder="e.g. Data Structures, Algorithms, System Design"
            className={errors.skillAreas ? "border-destructive" : ""}
          />
          {errors.skillAreas && (
            <p className="text-sm text-destructive">{errors.skillAreas}</p>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {showReset && (
          <Button variant="outline" onClick={handleReset} disabled={loading}>
            Reset
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className={!showReset ? "w-full" : ""}
        >
          {loading ? "Generating..." : "Generate Questions"}
        </Button>
      </CardFooter>
    </Card>
  );
}
