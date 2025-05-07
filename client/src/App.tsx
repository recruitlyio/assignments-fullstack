// src/App.tsx
import { useState } from 'react'
import InputForm from './components/InputForm'
import ResultDisplay from './components/ResultDisplay'
import { sendDataToBackend } from './services/api'
import './App.css'

function App() {
  const [parsedData, setParsedData] = useState<any>(null)

  const handleParse = async (input: string) => {
    try {
      const result = await sendDataToBackend(input)
      setParsedData(result)
    } catch (error) {
      alert('Error parsing data: ' + (error as Error).message)
    }
  }

  return (
    <div className="container">
      <h1>Intelligent Resume Data Parser</h1>
      <InputForm onSubmit={handleParse} />
      <ResultDisplay data={parsedData} />
    </div>
  )
}

export default App
