import { useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { X, PlusCircle } from "lucide-react";
import axios from "axios";

type Role =
  | "frontend-developer"
  | "backend-developer"
  | "fullstack-developer"
  | "mobile-developer";

type Experience = "beginner" | "intermediate" | "advanced";

const experience: Experience[] = ["beginner", "intermediate", "advanced"];
const roles: Role[] = [
  "frontend-developer",
  "backend-developer",
  "fullstack-developer",
  "mobile-developer",
];

interface Skill {
  skill: string;
  note: string;
}

const JobApplicationForm = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [newNote, setNewNote] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]); // <-- NEW

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { skill: newSkill, note: newNote }]);
      setNewSkill("");
      setNewNote("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { selectedRole, selectedExperience, skills };

    try {
      const response = await axios.post("http://localhost:3000", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setQuestions(response.data); // <-- store response
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleChangeExperience = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedExperience(e.target.value);
  };

  const handleChangeSkill = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-6">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="space-y-6">
            {/* Job Role */}
            <div>
              <label
                htmlFor="job-role"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Job Role
              </label>
              <select
                id="job-role"
                value={selectedRole}
                onChange={handleChangeRole}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="" disabled>
                  Select Job Role
                </option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience-level"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Experience Level
              </label>
              <select
                id="experience-level"
                value={selectedExperience}
                onChange={handleChangeExperience}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="" disabled>
                  Select Experience Level
                </option>
                {experience.map((exp, idx) => (
                  <option key={idx} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center bg-blue-900/30 hover:bg-blue-900/50 border border-blue-800 rounded-lg px-3 py-1.5"
                  >
                    <span className="text-blue-200 text-sm mr-1">
                      {item.skill}
                    </span>
                    {item.note && (
                      <span className="text-blue-300/70 text-xs italic mx-1 hidden group-hover:inline">
                        ({item.note})
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="ml-1 text-blue-400 hover:text-blue-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Skill Input*/}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newSkill}
                    placeholder="Add a skill (Press Enter)"
                    onChange={handleChangeSkill}
                    onKeyDown={handleKeyDown}
                    className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg"
            >
              Generate Questions
            </button>
          </div>
        </div>

        {/* Questions Display */}
        {questions.length > 0 && (
          <div className="bg-gray-900 my-5 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-4">
              Generated Questions
            </h2>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="flex  justify-center items-center gap-2 bg-gray-800 text-white p-4 rounded-lg shadow hover:bg-gray-600 transition-colors"
                >
                  <h1 className="p-2 text-2xl">{index + 1}</h1>
                  <li>{question}</li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationForm;
