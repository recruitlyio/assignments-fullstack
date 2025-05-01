import { useMemo } from 'react';
import { FormData } from '../types/form';

type ValidationErrors = {
  [K in keyof FormData]?: string;
} & {
  skillAreas?: Array<{
    [key: string]: string;
  }>;
};

export const useFormValidation = (formData: FormData) => {
  const errors = useMemo(() => {
    const validationErrors: ValidationErrors = {};

    // Validate job title
    if (!formData.jobTitle.trim()) {
      validationErrors.jobTitle = 'Job title is required';
    }

    // Validate job description
    if (!formData.jobDescription.trim()) {
      validationErrors.jobDescription = 'Job description is required';
    } else if (formData.jobDescription.trim().length < 50) {
      validationErrors.jobDescription = 'Job description should be more detailed (at least 50 characters)';
    }

    // Validate company name
    if (!formData.companyName.trim()) {
      validationErrors.companyName = 'Company name is required';
    }

    // Validate skill areas
    if (formData.skillAreas.length === 0) {
      validationErrors.skillAreas = [{ general: 'At least one skill area is required' }];
    } else {
      const skillAreaErrors = formData.skillAreas.map(skill => {
        const errors: Record<string, string> = {};

        if (!skill.name.trim()) {
          errors.name = 'Skill name is required';
        }

        if (!skill.description.trim()) {
          errors.description = 'Skill description is required';
        }

        if (!skill.evaluationCriteria.trim()) {
          errors.evaluationCriteria = 'Evaluation criteria is required';
        }

        return Object.keys(errors).length ? errors : null;
      });

      if (skillAreaErrors.some(error => error !== null)) {
        validationErrors.skillAreas = skillAreaErrors as Array<{ [key: string]: string }>;
      }
    }

    return validationErrors;
  }, [formData]);

  const isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
};