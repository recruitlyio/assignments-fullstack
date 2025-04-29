import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  questionService,
  QuestionGenerationParams,
  JobMatchQuestionRequest,
  Question,
  QuestionDifficulty,
  QuestionCategory,
  SeniorityLevel,
} from '../services/api';

const QuestionGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generationType, setGenerationType] = useState<
    'general' | 'job-specific'
  >('general');
  const [activeTab, setActiveTab] = useState<'form' | 'results'>('form');

  // General question generation form
  const [generalForm, setGeneralForm] = useState<QuestionGenerationParams>({
    count: 5,
    difficulty: QuestionDifficulty.MEDIUM,
    categories: [],
    seniorityLevel: SeniorityLevel.MID,
    keywords: [],
  });

  // Job-specific question generation form
  const [jobSpecificForm, setJobSpecificForm] =
    useState<JobMatchQuestionRequest>({
      candidateProfile: {
        yearsOfExperience: 3,
        skills: [],
        experienceDescription: '',
      },
      jobRequirements: {
        requiredSkills: [],
        minimumYearsExperience: 3,
        jobDescription: '',
        preferredQualifications: [],
      },
      difficulty: QuestionDifficulty.MEDIUM,
      count: 5,
    });

  // Skill input state
  const [candidateSkillInput, setCandidateSkillInput] = useState('');
  const [jobSkillInput, setJobSkillInput] = useState('');
  const [keywordInput, setKeywordInput] = useState('');

  const handleGeneralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedQuestions = await questionService.generateQuestions(
        generalForm
      );
      setQuestions(generatedQuestions);
      setActiveTab('results');
      toast.success('Questions generated successfully!');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to generate questions. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleJobSpecificSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedQuestions =
        await questionService.generateJobSpecificQuestions(jobSpecificForm);
      setQuestions(generatedQuestions);
      setActiveTab('results');
      toast.success('Job-specific questions generated successfully!');
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to generate job-specific questions. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addCandidateSkill = () => {
    if (
      candidateSkillInput.trim() &&
      !jobSpecificForm.candidateProfile.skills.includes(
        candidateSkillInput.trim()
      )
    ) {
      setJobSpecificForm({
        ...jobSpecificForm,
        candidateProfile: {
          ...jobSpecificForm.candidateProfile,
          skills: [
            ...jobSpecificForm.candidateProfile.skills,
            candidateSkillInput.trim(),
          ],
        },
      });
      setCandidateSkillInput('');
    }
  };

  const addJobSkill = () => {
    if (
      jobSkillInput.trim() &&
      !jobSpecificForm.jobRequirements.requiredSkills.includes(
        jobSkillInput.trim()
      )
    ) {
      setJobSpecificForm({
        ...jobSpecificForm,
        jobRequirements: {
          ...jobSpecificForm.jobRequirements,
          requiredSkills: [
            ...jobSpecificForm.jobRequirements.requiredSkills,
            jobSkillInput.trim(),
          ],
        },
      });
      setJobSkillInput('');
    }
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !generalForm.keywords?.includes(keywordInput.trim())
    ) {
      setGeneralForm({
        ...generalForm,
        keywords: [...(generalForm.keywords || []), keywordInput.trim()],
      });
      setKeywordInput('');
    }
  };

  const removeCandidateSkill = (skill: string) => {
    setJobSpecificForm({
      ...jobSpecificForm,
      candidateProfile: {
        ...jobSpecificForm.candidateProfile,
        skills: jobSpecificForm.candidateProfile.skills.filter(
          (s) => s !== skill
        ),
      },
    });
  };

  const removeJobSkill = (skill: string) => {
    setJobSpecificForm({
      ...jobSpecificForm,
      jobRequirements: {
        ...jobSpecificForm.jobRequirements,
        requiredSkills: jobSpecificForm.jobRequirements.requiredSkills.filter(
          (s) => s !== skill
        ),
      },
    });
  };

  const removeKeyword = (keyword: string) => {
    setGeneralForm({
      ...generalForm,
      keywords: generalForm.keywords?.filter((k) => k !== keyword) || [],
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Interview Question Generator
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row border-b">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                generationType === 'general'
                  ? 'bg-blue-50 text-blue-600 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setGenerationType('general')}
            >
              General Questions
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                generationType === 'job-specific'
                  ? 'bg-blue-50 text-blue-600 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setGenerationType('job-specific')}
            >
              Job-Specific Questions
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row border-b mb-6">
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'form'
                    ? 'text-blue-600 border-b-2 sm:border-b-0 sm:border-r-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('form')}
              >
                Configuration
              </button>
              <button
                className={`py-2 px-4 font-medium ${
                  activeTab === 'results'
                    ? 'text-blue-600 border-b-2 sm:border-b-0 sm:border-l-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('results')}
                disabled={questions.length === 0}
              >
                Results
              </button>
            </div>

            {activeTab === 'form' ? (
              <div>
                {generationType === 'general' ? (
                  <form onSubmit={handleGeneralSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Questions
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={generalForm.count}
                          onChange={(e) =>
                            setGeneralForm({
                              ...generalForm,
                              count: parseInt(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={generalForm.difficulty}
                          onChange={(e) =>
                            setGeneralForm({
                              ...generalForm,
                              difficulty: e.target.value as QuestionDifficulty,
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={QuestionDifficulty.EASY}>Easy</option>
                          <option value={QuestionDifficulty.MEDIUM}>
                            Medium
                          </option>
                          <option value={QuestionDifficulty.HARD}>Hard</option>
                          <option value={QuestionDifficulty.EXPERT}>
                            Expert
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seniority Level
                        </label>
                        <select
                          value={generalForm.seniorityLevel}
                          onChange={(e) =>
                            setGeneralForm({
                              ...generalForm,
                              seniorityLevel: e.target.value as SeniorityLevel,
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={SeniorityLevel.JUNIOR}>Junior</option>
                          <option value={SeniorityLevel.MID}>Mid</option>
                          <option value={SeniorityLevel.SENIOR}>Senior</option>
                          <option value={SeniorityLevel.STAFF}>Staff</option>
                          <option value={SeniorityLevel.PRINCIPAL}>
                            Principal
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categories
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.values(QuestionCategory).map((category) => (
                            <label
                              key={category}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={generalForm.categories?.includes(
                                  category
                                )}
                                onChange={(e) => {
                                  const categories =
                                    generalForm.categories || [];
                                  if (e.target.checked) {
                                    setGeneralForm({
                                      ...generalForm,
                                      categories: [...categories, category],
                                    });
                                  } else {
                                    setGeneralForm({
                                      ...generalForm,
                                      categories: categories.filter(
                                        (c) => c !== category
                                      ),
                                    });
                                  }
                                }}
                                className="rounded text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm">
                                {category.replace('_', ' ')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords (optional)
                      </label>
                      <div className="flex mb-2">
                        <input
                          type="text"
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' &&
                            (e.preventDefault(), addKeyword())
                          }
                          className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Add keywords..."
                        />
                        <button
                          type="button"
                          onClick={addKeyword}
                          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {generalForm.keywords?.map((keyword) => (
                          <span
                            key={keyword}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                          >
                            {keyword}
                            <button
                              type="button"
                              onClick={() => removeKeyword(keyword)}
                              className="ml-2 text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Generating Questions...
                          </>
                        ) : (
                          'Generate Questions'
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    onSubmit={handleJobSpecificSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Questions
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={jobSpecificForm.count}
                          onChange={(e) =>
                            setJobSpecificForm({
                              ...jobSpecificForm,
                              count: parseInt(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={jobSpecificForm.difficulty}
                          onChange={(e) =>
                            setJobSpecificForm({
                              ...jobSpecificForm,
                              difficulty: e.target.value as QuestionDifficulty,
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={QuestionDifficulty.EASY}>Easy</option>
                          <option value={QuestionDifficulty.MEDIUM}>
                            Medium
                          </option>
                          <option value={QuestionDifficulty.HARD}>Hard</option>
                          <option value={QuestionDifficulty.EXPERT}>
                            Expert
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Candidate Profile
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={
                              jobSpecificForm.candidateProfile.yearsOfExperience
                            }
                            onChange={(e) =>
                              setJobSpecificForm({
                                ...jobSpecificForm,
                                candidateProfile: {
                                  ...jobSpecificForm.candidateProfile,
                                  yearsOfExperience: parseInt(e.target.value),
                                },
                              })
                            }
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Experience Description
                          </label>
                          <textarea
                            value={
                              jobSpecificForm.candidateProfile
                                .experienceDescription
                            }
                            onChange={(e) =>
                              setJobSpecificForm({
                                ...jobSpecificForm,
                                candidateProfile: {
                                  ...jobSpecificForm.candidateProfile,
                                  experienceDescription: e.target.value,
                                },
                              })
                            }
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder="Describe the candidate's experience..."
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Candidate Skills
                        </label>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={candidateSkillInput}
                            onChange={(e) =>
                              setCandidateSkillInput(e.target.value)
                            }
                            onKeyPress={(e) =>
                              e.key === 'Enter' &&
                              (e.preventDefault(), addCandidateSkill())
                            }
                            className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add skills..."
                          />
                          <button
                            type="button"
                            onClick={addCandidateSkill}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {jobSpecificForm.candidateProfile.skills.map(
                            (skill) => (
                              <span
                                key={skill}
                                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeCandidateSkill(skill)}
                                  className="ml-2 text-green-600 hover:text-green-800"
                                >
                                  ×
                                </button>
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">
                        Job Requirements
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Years of Experience
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={
                              jobSpecificForm.jobRequirements
                                .minimumYearsExperience
                            }
                            onChange={(e) =>
                              setJobSpecificForm({
                                ...jobSpecificForm,
                                jobRequirements: {
                                  ...jobSpecificForm.jobRequirements,
                                  minimumYearsExperience: parseInt(
                                    e.target.value
                                  ),
                                },
                              })
                            }
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Job Description
                          </label>
                          <textarea
                            value={
                              jobSpecificForm.jobRequirements.jobDescription
                            }
                            onChange={(e) =>
                              setJobSpecificForm({
                                ...jobSpecificForm,
                                jobRequirements: {
                                  ...jobSpecificForm.jobRequirements,
                                  jobDescription: e.target.value,
                                },
                              })
                            }
                            className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                            placeholder="Describe the job requirements..."
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Required Skills
                        </label>
                        <div className="flex mb-2">
                          <input
                            type="text"
                            value={jobSkillInput}
                            onChange={(e) => setJobSkillInput(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === 'Enter' &&
                              (e.preventDefault(), addJobSkill())
                            }
                            className="flex-1 p-2 border rounded-l focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add required skills..."
                          />
                          <button
                            type="button"
                            onClick={addJobSkill}
                            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {jobSpecificForm.jobRequirements.requiredSkills.map(
                            (skill) => (
                              <span
                                key={skill}
                                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeJobSkill(skill)}
                                  className="ml-2 text-purple-600 hover:text-purple-800"
                                >
                                  ×
                                </button>
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Qualifications (optional)
                        </label>
                        <textarea
                          value={
                            jobSpecificForm.jobRequirements.preferredQualifications?.join(
                              ', '
                            ) || ''
                          }
                          onChange={(e) =>
                            setJobSpecificForm({
                              ...jobSpecificForm,
                              jobRequirements: {
                                ...jobSpecificForm.jobRequirements,
                                preferredQualifications: e.target.value
                                  .split(',')
                                  .map((q) => q.trim())
                                  .filter((q) => q),
                              },
                            })
                          }
                          className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                          rows={2}
                          placeholder="Enter preferred qualifications separated by commas..."
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Generating Job-Specific Questions...
                          </>
                        ) : (
                          'Generate Job-Specific Questions'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    Generated Questions
                  </h2>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back to Configuration
                  </button>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">
                            Question {index + 1}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              question.difficulty === QuestionDifficulty.EASY
                                ? 'bg-green-100 text-green-800'
                                : question.difficulty ===
                                  QuestionDifficulty.MEDIUM
                                ? 'bg-yellow-100 text-yellow-800'
                                : question.difficulty ===
                                  QuestionDifficulty.HARD
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {question.difficulty}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {question.seniorityLevel.map((level) => (
                            <span
                              key={level}
                              className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="prose max-w-none mb-4">
                        <p className="text-gray-700">{question.content}</p>
                      </div>

                      {question.expectedAnswer && (
                        <div className="mt-4 pt-4 border-t">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Expected Answer:
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {question.expectedAnswer}
                          </p>
                        </div>
                      )}

                      {question.hints && question.hints.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Hints:
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            {question.hints.map((hint, i) => (
                              <li key={i}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {question.evaluationCriteria &&
                        question.evaluationCriteria.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Evaluation Criteria:
                            </h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600">
                              {question.evaluationCriteria.map(
                                (criterion, i) => (
                                  <li key={i}>{criterion}</li>
                                )
                              )}
                            </ul>
                          </div>
                        )}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {question.category.map((cat) => (
                          <span
                            key={cat}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                          >
                            {cat.replace('_', ' ')}
                          </span>
                        ))}
                        {question.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionGenerator;
