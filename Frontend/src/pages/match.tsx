import { useState, useEffect } from "react";
import "./home.css";
import { MatchResult } from "../types";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import ReactMarkdown from "react-markdown";
import { useMatchStore } from "../store";

function Match() {
  const [searchParams] = useSearchParams();
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const getMatch = useMatchStore((state) => state.getMatch);

  useEffect(() => {
    const candidateId = searchParams.get("candidateId");
    const jobId = searchParams.get("jobId");

    if (!candidateId || !jobId) {
      setError("Missing candidateId or jobId in URL parameters");
      return;
    }

    const fetchMatchResult = async () => {
      try {
        const result = await getMatch(candidateId, jobId);
        if (result) {
          setMatchResult(result);
        } else {
          setError("Failed to fetch match result");
        }
      } catch (error) {
        console.error("Error fetching match result:", error);
        setError("Failed to fetch match result");
      }
    };

    fetchMatchResult();
  }, [searchParams, getMatch]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!matchResult) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Score Section */}
          <Grid>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Match Analysis
              </Typography>
              <Chip
                label={`Score: ${(matchResult.score * 100).toFixed(0)}%`}
                color={
                  matchResult.score >= 0.7
                    ? "success"
                    : matchResult.score >= 0.4
                    ? "warning"
                    : "error"
                }
                sx={{ ml: 2, fontSize: "1.2rem", padding: "0.5rem" }}
              />
            </Box>
          </Grid>

          {/* Matched Skills Section */}
          <Grid>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Matched Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {matchResult.matches.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="success"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Missing Skills Section */}
          <Grid>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Missing Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {matchResult.missingSkills.length > 0 ? (
                  matchResult.missingSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="error"
                      variant="outlined"
                    />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No missing skills
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Transferable Skills Section */}
          <Grid>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Transferable Skills
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {matchResult.transferableSkills.map((skill, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {skill.skill}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {skill.explanation}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Explanation Section */}
          <Grid>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Detailed Analysis
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ typography: "body1" }}>
                <ReactMarkdown>{matchResult.explanation}</ReactMarkdown>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Match;
