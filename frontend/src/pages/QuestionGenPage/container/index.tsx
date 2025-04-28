// JobFormContainer.tsx
import React, { useState } from "react";
import { FormData, FormErrors } from "../types";
import Component from "../component"; // Import the UI component
import { axiosRequest } from "../../../utils/axios";

const Container: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    jobDescription: "",
    jobTitle: "",
    industry: "",
    experienceLower: "",
    experienceUpper: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
    if (name === "experienceLower" || name === "experienceUpper") {
      setFormErrors((prevErrors) => ({ ...prevErrors, experience: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    const {
      jobDescription,
      jobTitle,
      experienceLower,
      experienceUpper,
    } = formData;

    if (!jobTitle.trim()) {
      errors.jobTitle = "Job title is required.";
    }

    if (!jobDescription.trim()) {
      errors.jobDescription = "Job description is required.";
    }

    if (!experienceLower || !experienceUpper) {
      errors.experience =
        "Both lower and upper experience limits are required.";
    } else {
      const lower = parseInt(experienceLower, 10);
      const upperRaw = experienceUpper;
      let upper: number;

      if (upperRaw === "10") {
        upper = Infinity; 
      } else {
        upper = parseInt(upperRaw, 10);
      }

      if (isNaN(lower) || isNaN(upper) && upper !== Infinity) {
        errors.experience = "Invalid experience value selected.";
      } else if (upper !== Infinity && lower > upper) {
        errors.experience =
          "Upper experience limit must be greater than or equal to the lower limit.";
      }
    }

    return errors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const errors = validateForm();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      try {
        const response = await axiosRequest({
          method: "POST",
          url: "/", 
          data: formData,
        });
        console.log("Submission successful:", response.data);
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  

  const generateExperienceOptions = () => {
    const options = [
      { value: "0", label: "0 years (Intern/Entry)" },
      { value: "1", label: "1 year" },
      { value: "2", label: "2 years" },
      { value: "3", label: "3 years" },
      { value: "4", label: "4 years" },
      { value: "5", label: "5 years" },
      { value: "7", label: "7 years" },
      { value: "10", label: "10+ years" },
    ];
    return options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ));
  };

  return (
    <Component
      formData={formData}
      formErrors={formErrors}
      isSubmitting={isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      generateExperienceOptions={generateExperienceOptions}
    />
  );
};

export default Container;
