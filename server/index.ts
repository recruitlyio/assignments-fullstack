import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import resumeRoutes from './routes/resumeRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Middleware to parse JSON bodies
app.use('/api/resume', resumeRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Resume Parser running')
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
