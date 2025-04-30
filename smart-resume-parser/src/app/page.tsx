"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const parseResume = async (resumeContent: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/parser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText: resumeContent }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }
      setLoading(false);
      localStorage.setItem("parsedResume", JSON.stringify(data));

      router.push("/resume-response");
    } catch (err) {
      console.log(err);
      alert("Server is busy please try after some time.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center flex-col mt-8">
      <h1 className="text-center text-2xl font-bold">Smart Resume Parser</h1>
      <form
        className="mt-4  bg-white shadow-md rounded-lg p-8 w-full md:w-2xl flex flex-col items-center"
        onSubmit={async (e) => {
          e.preventDefault();
          const resumeContent = e.currentTarget.resumeContent.value;
          if (!resumeContent) alert("Please enter resume content");
          await parseResume(resumeContent);
        }}
      >
        <label
          htmlFor="resumeContent"
          className="self-start text-sm mb-2 font-semibold flex items-center gap-2"
        >
          Resume Content
          <span className="group relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="16px"
              height="16px"
              className="cursor-pointer"
              baseProfile="basic"
            >
              <circle cx="24" cy="26" r="20" />
              <circle cx="24" cy="24" r="19" fill="#fff" />
              <path d="M24,44C12.972,44,4,35.028,4,24S12.972,4,24,4s20,8.972,20,20S35.028,44,24,44z M24,6C14.075,6,6,14.075,6,24	s8.075,18,18,18s18-8.075,18-18S33.925,6,24,6z" />
              <circle cx="25" cy="17" r="3" />
              <path d="M27.728,32.514c-0.15-0.532-0.705-0.841-1.234-0.689L25.521,32.1l1.391-8.48c0.057-0.346-0.071-0.695-0.337-0.922	c-0.266-0.228-0.632-0.3-0.963-0.189l-5.716,1.891c-0.524,0.173-0.809,0.739-0.635,1.263c0.173,0.524,0.74,0.81,1.263,0.635	l4.147-1.372l-1.378,8.403c-0.055,0.338,0.066,0.68,0.321,0.908c0.186,0.166,0.423,0.254,0.666,0.254	c0.091,0,0.183-0.012,0.272-0.038l2.487-0.705C27.57,33.598,27.879,33.045,27.728,32.514z" />
              <path d="M22.392,24.537l-1.184,8.226c-0.214,1.247,0.926,2.301,2.152,1.991l1.711-0.447l0.792-10.85L22.392,24.537z" />
            </svg>
            <div className="group-hover:block w-96 hidden absolute bg-white p-2 shadow-sm rounded-md">
              <ul className="list-disc list-inside">
                <li>Minimum 100 characters.</li>
                <li>Content should be from resume only.</li>
                <li>It should include experience, education, skills.</li>
              </ul>
            </div>
          </span>
        </label>
        <textarea
          name="resumeContent"
          id="resumeContent"
          placeholder="Paste your resume content text here..."
          className="w-full border rounded-lg focus:outline-none p-2"
          rows={15}
          minLength={100}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 p-2 rounded-md px-4 text-white mt-4 cursor-pointer flex items-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Process Resume"}
          {loading && (
            <svg
              className="animate-spin -ml-1
              h-5 w-5 text-white"
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
          )}
        </button>
      </form>
    </div>
  );
}
