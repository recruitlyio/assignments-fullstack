'use client'
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface Candidate {
  name: string;
  skills: string;
  experience: string;
}

interface MatchResult {
  candidate: string;
  score: number;
  explanation: string;
}

export default function MatchPage() {
  const [job, setJob] = useState(`We are looking for a Frontend Developer with 2+ years of experience in React.js, 
strong skills in TypeScript, and knowledge of UI/UX design principles. 
Familiarity with Tailwind CSS and REST APIs is a plus`);
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      name: "Udipta Gogoi",
      skills: "React, JavaScript, TypeScript, HTML, CSS, Tailwind",
      experience: "3 years working as a React developer at a SaaS startup. Built responsive dashboards and internal tools."
    },
    {
      name: "Dipankar Deka",
      skills: "Vue.js, JavaScript, Bootstrap, REST APIs",
      experience: "4 years in frontend development. Switched from jQuery to Vue. Some experience with React in hobby projects."
    },
    {
      name: "Manisha Barman",
      skills: "React, TypeScript, Figma, Tailwind, Node.js",
      experience: "2 years as full-stack developer. Led UI development for an e-commerce app. Strong design collaboration."
    },
    {
      name: "Rupam Das",
      skills: "Angular, TypeScript, SCSS",
      experience: "5 years in enterprise web development with Angular. Limited experience with React but quick learner."
    }
  ]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, field: keyof Candidate, value: string) => {
    const updated = [...candidates];
    updated[index][field] = value;
    setCandidates(updated);
  };

  const handleMatch = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/match", {
        job,
        candidates,
      });
      setResults(res.data.results);
    } catch (error) {
      console.error("Error matching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Candidate Matching System</h1>
      <div className="flex gap-8">
        {/* Left Column: Candidates */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Candidates</h2>
          <div className="max-h-screen overflow-y-auto">
            {candidates.map((c, i) => (
              <div key={i} className="border p-4 mb-4 rounded-lg bg-gray-50">
          <input
            className="w-full mb-3 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
            value={c.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
          />
          <input
            className="w-full mb-3 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Skills"
            value={c.skills}
            onChange={(e) => handleChange(i, "skills", e.target.value)}
          />
          <input
            className="w-full mb-3 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Experience"
            value={c.experience}
            onChange={(e) => handleChange(i, "experience", e.target.value)}
          />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              setCandidates([...candidates, { name: "", skills: "", experience: "" }])
            }
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-6 hover:bg-gray-300"
          >
            Add Candidate
          </button>
        </div>

        {/* Right Column: Job Description and Match Results */}
        <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Job Description</h2>
          <textarea
            className="w-full p-4 border rounded-lg mb-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter job description..."
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <button
            onClick={handleMatch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center cursor-pointer mb-6"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Match Candidates"}
          </button>
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Match Results</h2>
            {results.map((r, idx) => (
              <div key={idx} className="bg-gray-100 p-4 mb-4 rounded-lg">
                <h3 className="font-bold text-gray-800">{r.candidate} - Score: {r.score}</h3>
                <p className="text-gray-700">{r.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
