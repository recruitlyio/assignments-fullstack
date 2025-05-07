import { Request, Response} from 'express'
import { parseAndValidateResume } from '../services/resumeService' // The main service function

export const parseResumeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { resumeText } = req.body

  if (
    !resumeText ||
    typeof resumeText !== 'string' ||
    resumeText.trim() === ''
  ) {
    res.status(400).json({ error: 'Resume text is required...' })
    return
  }

  try {
    // const parsedData = await parseAndValidateResume(resumeText)
    console.log(resumeText)
    res.status(200).json(resumeText)
    // res.status(200).json(parsedData)
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while processing the resume.',
    })
    console.error('Error processing resume:', error)
  }
}
