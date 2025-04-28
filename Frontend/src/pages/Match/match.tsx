import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MatchResult } from "../../types";
import ReactMarkdown from "react-markdown";
import { useMatchStore } from "../../store";
import "./match.css";

function Match() {
  const [searchParams] = useSearchParams();
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getMatch = useMatchStore((state) => state.getMatch);

  useEffect(() => {
    const candidateId = searchParams.get("candidateId");
    const jobId = searchParams.get("jobId");

    if (!candidateId || !jobId) {
      setError("Missing candidate or job ID");
      setLoading(false);
      return;
    }

    const fetchMatch = async () => {
      try {
        const result = await getMatch(candidateId, jobId);
        if (result) {
          setMatchResult(result);
        } else {
          setError("Failed to fetch match results");
        }
      } catch (err) {
        setError("Failed to fetch match results");
        console.error("Error fetching match:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [searchParams, getMatch]);

  if (loading) {
    return (
      <div className="match-container">
        <div className="match-content">
          <h1>Loading match results...</h1>
        </div>
      </div>
    );
  }

  if (error || !matchResult) {
    return (
      <div className="match-container">
        <div className="match-content">
          <h1>Error</h1>
          <p>{error || "No match results found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="match-container">
      <div className="match-content">
        <div className="match-header">
          <h1>Candidate-Job Match Analysis</h1>
          <div className="score-display">
            <span className="score-value">{matchResult.score.toFixed(2)}</span>
            <span className="score-label">Match Score</span>
          </div>
        </div>

        <div className="skills-section">
          <h3>Matching Skills</h3>
          <div className="skill-list">
            {matchResult.matches.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {matchResult.missingSkills.length > 0 && (
          <div className="skills-section">
            <h3>Missing Skills</h3>
            <div className="skill-list">
              {matchResult.missingSkills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {matchResult.transferableSkills.length > 0 && (
          <div className="skills-section">
            <h3>Transferable Skills</h3>
            <div className="skill-list">
              {matchResult.transferableSkills.map((skill) => (
                <span key={skill.skill} className="skill-chip">
                  {skill.skill} ({skill.potential.toFixed(2)})
                </span>
              ))}
            </div>
          </div>
        )}

        {matchResult.explanation &&
          !matchResult.explanation.includes("Basic Match Analysis") && (
            <div className="match-analysis">
              <ReactMarkdown>{matchResult.explanation}</ReactMarkdown>
            </div>
          )}
      </div>
    </div>
  );
}

export default Match;
