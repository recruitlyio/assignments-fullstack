import React, { useState } from "react";
import Layout from "../components/Layout";
import SkillsTag from "../components/SkillsTag";
import axios from "axios";
import QueAnsList from "./QueAnsList";
import sampleData from "../data/sample.json";

const Home = () => {
  const [formData, setFormData] = useState({
    userName: "",
    jobRole: "",
    experience: "",
    jobDescription: "",
    noOfQuestions: "",
  });
  const [skills, setSkills] = useState([]);
  const [qaList, setQaList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      skills: skills,
    };
    setQaList(sampleData.result);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/generate-questions",
        payload
      );
      setQaList(res.data.result);
    } catch (err) {
      alert(err?.response?.data?.error ?? "Something went wrong!");
      console.error("Error", err);
    }
  };
  return (
    <Layout>
      {qaList?.length > 0 ? (
        <QueAnsList qaList={qaList} />
      ) : (
        <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Generate Interview Questions
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-base font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="userName"
                type="text"
                value={formData.userName}
                onChange={handleChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter job role"
              />
            </div>
            <div>
              <label
                htmlFor="jobRole"
                className="block text-base font-medium text-gray-700"
              >
                Job Role <span className="text-red-500">*</span>
              </label>
              <input
                id="jobRole"
                name="jobRole"
                type="text"
                value={formData.jobRole}
                onChange={handleChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter job role"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-base font-medium text-gray-700"
              >
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Job Description"
                rows="4"
              />
            </div>
            <div>
              <label
                htmlFor="experience"
                className="block text-base font-medium text-gray-700"
              >
                Experience (in years) <span className="text-red-500">*</span>
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter years of experience"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Skills <span className="text-red-500">*</span>
              </label>
              <SkillsTag tags={skills} setTags={setSkills} />
            </div>
            <div>
              <label
                htmlFor="noOfQuestions"
                className="block text-base font-medium text-gray-700"
              >
                Number Of Que. <span className="text-red-500">*</span>
              </label>
              <input
                id="noOfQuestions"
                name="noOfQuestions"
                type="number"
                value={formData.noOfQuestions}
                onChange={handleChange}
                required
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Number Of Que."
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default Home;
