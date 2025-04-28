import React, { ReactNode } from "react";
import { FormData, FormErrors } from "../types";
import { styles, combineClasses } from "./styles";

interface JobFormProps {
  formData: FormData;
  formErrors: FormErrors;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  generateExperienceOptions: () => ReactNode;
}

const Component: React.FC<JobFormProps> = ({
  formData,
  formErrors,
  isSubmitting,
  handleChange,
  handleSubmit,
  generateExperienceOptions,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
      <div className={styles.fieldGroup}>
        <label htmlFor="jobTitle" className={styles.label}>
          Job Title <span className={styles.requiredMark}>*</span>
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="e.g., Senior Software Engineer"
          className={formErrors.jobTitle ? styles.inputWithError : styles.input}
          aria-invalid={!!formErrors.jobTitle}
          aria-describedby={formErrors.jobTitle ? "jobTitle-error" : undefined}
          required
        />
        {formErrors.jobTitle && (
          <p id="jobTitle-error" className={styles.errorText}>
            {formErrors.jobTitle}
          </p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="industry" className={styles.label}>
          Industry
        </label>
        <input
          id="industry"
          name="industry"
          type="text"
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g., Technology, Finance, Healthcare"
          className={styles.input}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="jobDescription" className={styles.label}>
          Job Description <span className={styles.requiredMark}>*</span>
        </label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the role, responsibilities, and requirements..."
          className={formErrors.jobDescription ? styles.textareaWithError : styles.textarea}
          aria-invalid={!!formErrors.jobDescription}
          aria-describedby={
            formErrors.jobDescription ? "jobDescription-error" : undefined
          }
          required
        />
        {formErrors.jobDescription && (
          <p id="jobDescription-error" className={styles.errorText}>
            {formErrors.jobDescription}
          </p>
        )}
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>
          Required Experience Range <span className={styles.requiredMark}>*</span>
        </legend>
        <div className={styles.experienceGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="experienceLower" className={styles.experienceLabel}>
              Minimum Years
            </label>
            <select
              id="experienceLower"
              name="experienceLower"
              value={formData.experienceLower}
              onChange={handleChange}
              className={formErrors.experience ? styles.selectWithError : styles.select}
              aria-invalid={!!formErrors.experience}
              aria-describedby={
                formErrors.experience ? "experience-error" : undefined
              }
              required
            >
              <option value="" disabled>
                Select minimum
              </option>
              {generateExperienceOptions()}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="experienceUpper" className={styles.experienceLabel}>
              Maximum Years
            </label>
            <select
              id="experienceUpper"
              name="experienceUpper"
              value={formData.experienceUpper}
              onChange={handleChange}
              className={formErrors.experience ? styles.selectWithError : styles.select}
              aria-invalid={!!formErrors.experience}
              aria-describedby={
                formErrors.experience ? "experience-error" : undefined
              }
              required
            >
              <option value="" disabled>
                Select maximum
              </option>
              {generateExperienceOptions()}
            </select>
          </div>
        </div>
        {formErrors.experience && (
          <p id="experience-error" className={styles.errorText}>
            {formErrors.experience}
          </p>
        )}
      </fieldset>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={combineClasses(
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled
          )}
        >
          {isSubmitting ? "Submitting..." : "Submit Job Posting"}
        </button>
      </div>
    </form>
  );
};

export default Component;
