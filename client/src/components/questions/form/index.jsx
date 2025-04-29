import { useState } from "react";
import LoaderComponent from "../../general/loader";

const QuestionFormComponent = ({
  jobTitle,
  setJobTitle,
  skill,
  setSkill,
  experienceLevel,
  setExperienceLevel,
  isNew,
  setIsNew,
  handleSubmit,
  isLoading,
  setIsLoading,
}) => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-center">Job Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
            />
          </div>

          {/* Skill */}
          <div className="mb-4">
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700"
            >
              Skill
            </label>
            <input
              id="skill"
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter skill"
            />
          </div>

          {/* Experience Level */}
          <div className="mb-4">
            <label
              htmlFor="experienceLevel"
              className="block text-sm font-medium text-gray-700"
            >
              Experience Level
            </label>
            <select
              id="experienceLevel"
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Level</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Is New Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isNew"
              checked={isNew}
              onChange={() => setIsNew(!isNew)}
              className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label
              htmlFor="isNew"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Is New
            </label>
          </div>

          {/* Full Width Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 rounded-lg focus:outline-none focus:ring-2 ${
                isLoading
                  ? "bg-indigo-400 text-white cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {isLoading ? <LoaderComponent /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuestionFormComponent;
