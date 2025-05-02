import { useState } from "react";
import { QuestionInput, GeneratedQuestion } from "../types";

interface Props {
  onGenerated: (q: GeneratedQuestion[]) => void; // Change from single question to array of questions
}

export default function Form({ onGenerated }: Props) {
  const [form, setForm] = useState<QuestionInput>({
    jobRequirements: "",  // Renaming the role to jobRequirements
    experience: "junior",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: GeneratedQuestion[] = await res.json();
      onGenerated(data);
      setForm({ jobRequirements: "", experience: "junior" });  // Clear the form after submission
    } catch (err) {
      console.error("Error generating questions:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="jobRequirements"
        value={form.jobRequirements}
        onChange={handleChange}
        placeholder="Enter job requirements (e.g., React, Node, Redux)"
        required
        className="border border-gray-300 rounded px-4 py-2 placeholder-gray-400"
      />
      <label className="text-sm font-medium text-gray-700">
        Experience Level
        <select
          name="experience"
          value={form.experience}
          onChange={handleChange}
          className="mt-1 border border-gray-300 rounded px-4 py-2 w-full"
        >
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </label>
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition ${
          !loading && "cursor-pointer"
        }`}
      >
        {loading ? "Loading..." : "Generate"}
      </button>
    </form>
  );
}
