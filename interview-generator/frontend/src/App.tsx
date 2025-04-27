import { useState } from 'react'
import './App.css'

function App() {
  interface responseType {
    question: string,
    evaluationCriteria: string,
  }

  interface resultsType {
    [key: string]: responseType[]
  }

  const [jobReq, setJobReq] = useState<string | null>(null)
  const [experienceLevel, setExperienceLevel] = useState<string | null>(null)
  const [results, setResults] = useState<resultsType | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const handleGenerate = async () => {
    if (!jobReq || !experienceLevel) {
      return
    }
    try {

      setLoading(true)
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobReq: jobReq,
          experienceLevel: experienceLevel,
        })
      })
      const json = await response.json()
      setResults(json.questions)
      setLoading(false)
    }
    catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div id='container'>
        <textarea
          rows={6}
          name='jobReq'
          placeholder='Enter Job Requirements'
          onChange={(e) => { setJobReq(e.target.value) }}
        />
        <select
          name='experience'
          onChange={(e) => { setExperienceLevel(e.target.value) }}>
          <option value="" hidden disabled selected>Select experience</option>
          <option>Junior-level</option>
          <option>Mid-level</option>
          <option>Senior-level</option>
        </select>
        <button onClick={handleGenerate}>Generate Questions</button>
      </div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-message">Loading your results...</div>
        </div>
      )}
      {results && (
        <div id="results">
          {Object.keys(results).map((category) => (
            <div key={category} className="category">
              <h3>{category}</h3>
              <ul>
                {results[category].map((item, index) => (
                  <li key={index} className="question-item">
                    <p><strong>Question:</strong> {item.question}</p>
                    <p><strong>Evaluation Criteria:</strong> {item.evaluationCriteria}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App

