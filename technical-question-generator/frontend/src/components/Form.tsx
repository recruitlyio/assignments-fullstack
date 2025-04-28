import React, { useState } from "react";
import axios from "../api/axiosInstance";

const Form = ({ setQuestions }: { setQuestions: (questions: any) => void }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    skills: "",
    experienceLevel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/questions", formData);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-lg w-full">
      <div>
        <label className="block mb-1 font-semibold">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Experience Level</label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        >
          <option value="">Select Level</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
        Generate Questions
      </button>
    </form>
  );
};

export default Form;
