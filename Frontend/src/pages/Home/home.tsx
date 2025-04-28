import { useState, useEffect } from "react";
import { Candidate, Job } from "../../types";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null
  );
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleMatch = async () => {
    if (!selectedCandidate || !selectedJob) return;

    navigate(
      `/match?candidateId=${selectedCandidate.id}&jobId=${selectedJob.id}`
    );
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Candidate-Job Matching System</h1>
      </div>
      <div className="selection-container">
        <div className="candidates-list">
          <h2>Candidates</h2>
          <ul>
            {candidates.map((candidate) => (
              <li
                key={candidate.id}
                className={
                  selectedCandidate?.id === candidate.id ? "selected" : ""
                }
                onClick={() => setSelectedCandidate(candidate)}
              >
                {candidate.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="jobs-list">
          <h2>Jobs</h2>
          <ul>
            {jobs.map((job) => (
              <li
                key={job.id}
                className={selectedJob?.id === job.id ? "selected" : ""}
                onClick={() => setSelectedJob(job)}
              >
                {job.title} - {job.company}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="match-btn">
        <button
          onClick={handleMatch}
          disabled={!selectedCandidate || !selectedJob}
          className={!selectedCandidate || !selectedJob ? "disabled" : ""}
        >
          Match
        </button>
      </div>
      <div className="details-container">
        <div className="details-panel">
          <h2>Candidate Details</h2>
          {selectedCandidate ? (
            <div className="details-content">
              <h3>{selectedCandidate.name}</h3>
              <h4>Skills:</h4>
              <ul>
                {selectedCandidate.skills.map((skill, index) => (
                  <li key={index}>
                    {skill.name} ({skill.years} years)
                  </li>
                ))}
              </ul>
              <h4>Experience:</h4>
              <ul>
                {selectedCandidate.experience.map((exp, index) => (
                  <li key={index}>{exp}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select a candidate to view details</p>
          )}
        </div>

        <div className="details-panel">
          <h2>Job Details</h2>
          {selectedJob ? (
            <div className="details-content">
              <h3>{selectedJob.title}</h3>
              <h4>Company: {selectedJob.company}</h4>
              <p>{selectedJob.description}</p>
              <h4>Requirements:</h4>
              <ul>
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>
                    {req.skill} ({req.minYears} years) -{" "}
                    {req.required ? "Required" : "Optional"}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select a job to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
