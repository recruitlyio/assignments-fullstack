import React, { useState } from "react";
import { FormData, FormErrors, QuestionData } from "../types";
import Component from "../component";
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
  
  
  const [questions, setQuestions] = useState<
  {
    question: string;
    evaluationGuidelines: string;
    skillsAssessed: string[];
  }[]
  >([]);
  
  const simulatedResponseData: QuestionData[] = [
      {
       "question": "Can you explain how you would implement a state management solution in a React application using Redux? Please provide a brief overview of the steps involved.",
       "evaluationGuidelines": "Look for an understanding of the Redux workflow: defining actions, creating reducers, setting up a store, and connecting components to the store using 'connect' or 'useSelector'/'useDispatch' hooks. The candidate should demonstrate knowledge of how to manage application state effectively in a React app.",
       "skillsAssessed": ["React.js", "Redux", "JavaScript"]
      },
      {
       "question": "How would you ensure that a web application you developed is responsive and performs well across different devices and browsers?",
       "evaluationGuidelines": "The candidate should mention techniques like media queries, responsive design principles, and possibly CSS frameworks (e.g., Bootstrap). They should also discuss performance optimization methods such as lazy loading, code splitting, and minimizing DOM manipulations. Cross-browser testing tools and strategies should also be mentioned.",
       "skillsAssessed": ["Responsive Design", "HTML5", "CSS3", "JavaScript", "Performance Optimization"]
      },
      {
       "question": "Describe how you would integrate a RESTful API into a frontend application. What steps would you take to handle asynchronous data fetching?",
       "evaluationGuidelines": "A good answer will include using 'fetch' or a library like Axios to make HTTP requests, handling promise-based asynchronous operations, and managing state changes based on API responses. Look for an understanding of error handling and potentially using hooks like 'useEffect' in React.",
       "skillsAssessed": ["RESTful APIs", "JavaScript (ES6+)", "React.js"]
      },
      {
       "question": "Can you give an example of how you've optimized a web application's performance in the past? What tools or techniques did you use?",
       "evaluationGuidelines": "The candidate should discuss specific performance bottlenecks they identified and the strategies or tools they used to address them. Look for mentions of profiling tools like Chrome DevTools, Lighthouse, or performance metrics. Techniques like code splitting, caching, or optimizing asset delivery should be part of the discussion.",
       "skillsAssessed": ["Performance Optimization", "JavaScript", "Web Development Tools"]
      },
      {
       "question": "What is your approach to writing and maintaining clean, efficient code? Can you provide an example of how you've applied best practices in a project?",
       "evaluationGuidelines": "The candidate should talk about coding standards, the use of linters, and adhering to design patterns or principles (e.g., DRY, KISS). They should also mention code reviews, refactoring, and collaboration with team members to ensure code quality. An example should reflect their commitment to maintainability and efficiency.",
       "skillsAssessed": ["Code Quality", "JavaScript", "Team Collaboration"]
      }
     ];

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
    const { jobDescription, jobTitle, experienceLower, experienceUpper } =
      formData;

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

      if (isNaN(lower) || (isNaN(upper) && upper !== Infinity)) {
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
        setTimeout(() => {
          setQuestions(simulatedResponseData);
          setIsSubmitting(false); // Move setIsSubmitting(false) inside the timeout callback
        }, 1000); 
        // const response = await axiosRequest({
        //   method: "POST",
        //   url: "/generate-questions",
        //   data: formData,
        // });
        // console.log("Submission successful:", response.data);
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
      questions={questions}
    />
  );
};

export default Container;
