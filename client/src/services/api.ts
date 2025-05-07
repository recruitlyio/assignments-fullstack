import axios from "axios"

export async function sendDataToBackend(input: string): Promise<any> {
const response = await axios.post('http://localhost:8000/api/resume/parse', {resumeText:input })

  if (response.status >= 400) {
    throw new Error(`Bad request: ${response.status} ${response.data}`)
  }

  return response.data
}
