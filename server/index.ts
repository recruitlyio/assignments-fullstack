import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(express.json()) // Middleware to parse JSON bodies

app.get('/', (req: Request, res: Response) => {
  res.send('Resume Parser running')
})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
