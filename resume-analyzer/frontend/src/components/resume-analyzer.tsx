"use client";

import { useState } from "react";
import { ParsedResume } from "@/types";
import { parseResume } from "@/services/api";
import ParsedResumeDisplay from "./parsed-resume";
import { toast, Toaster } from 'sonner'
import debounce from "lodash.debounce";


export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = debounce(async () => {
    setLoading(true)
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text first.");
      setLoading(false);
      return;
    }
    if (resumeText.trim().length < 20) {
      toast.error("Please provide relevant data for your resume.");
      setLoading(false);
      return;
    }
    setError(null); 
    try {
      const result = await parseResume(resumeText);
      if (result.error) {
        setError(result.error);
        setParsedResume(null)
        toast.error("Failed to parse resume");
      } else if (result.data) {
        setParsedResume(result.data);
        setError(null)
        toast.success("Resume parsed successfully!");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setParsedResume(null)
      toast.error("Failed to parse resume. Try again.");
    }
    setLoading(false);
  }, 1000);

  return (
    <div className="flex flex-col gap-6">
      <textarea
        className="border rounded p-4 w-full h-60"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded max-w-max"
      >
        {loading ? "Parsing..." : "Parse Resume"}
      </button>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>}

      {parsedResume && <ParsedResumeDisplay resume={parsedResume} />}
      <Toaster />
    </div>
  );
}
