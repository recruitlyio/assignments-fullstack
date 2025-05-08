import { EducationEntry } from "./education"
import { ExperienceEntry } from "./experience"

export interface ResumeData {
  name: string
  email?: string
  phone?: string
  location?: string
  summary?: string
  experience?: ExperienceEntry[]
  education?: EducationEntry[]
  skills?: string[]
  certifications?: string[]
  projects?: string[]
  languages?: string[]
}