import type { JSX } from 'react'
import './ResultDisplay.css' // Keep the CSS import

// Optional: Define a more specific interface for better type safety
interface Education {
  degree: string
  major: string
  institution: string
  location?: string // Optional location
  start_date: string
  end_date: string // Could be "Present"
}

interface Experience {
  job_title: string
  company: string
  location: string
  start_date: string
  end_date: string // Could be "Present"
  description: string // Might contain multiple points
}

interface ResumeData {
  full_name: string
  email: string
  phone: string
  location: string
  summary?: string // Summary can be optional
  skills?: string[]
  education?: Education[]
  experience?: Experience[]
  certifications?: string[]
  projects?: string[]
  languages?: string[] // This was empty in your example, but included for completeness
}

interface Props {
  data: ResumeData | null // Use the specific interface, allow null
}

const ResultDisplay = ({ data }: Props): JSX.Element | null => {
  if (!data) return null

  return (
    <div className="resume-display">
      {/* Basic Contact Info */}
      <header className="resume-header">
        <h1>{data.full_name}</h1>
        <p className="contact-info">
          <span>{data.email}</span> | <span>{data.phone}</span> |{' '}
          <span>{data.location}</span>
        </p>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="resume-section">
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          {data.experience.map((job, index) => (
            <div key={index} className="experience-item">
              <h3>{job.job_title}</h3>
              <p className="company-info">
                {job.company}, {job.location} | {job.start_date} -{' '}
                {job.end_date}
              </p>
              {/* Assuming description is a single paragraph or needs <p> */}
              <p>{job.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>
                {edu.degree} in {edu.major}
              </h3>
              <p className="institution-info">
                {edu.institution}
                {edu.location ? `, ${edu.location}` : ''} | {edu.start_date} -{' '}
                {edu.end_date}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills*/}
      {data.skills && data.skills.length > 0 && (
        <section className="resume-section">
          <h2>Skills</h2>
          <ul className="item-list skills-list">
            {' '}
            {/* Using specific class for styling */}
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="resume-section">
          <h2>Projects</h2>
          <ul className="project-list">
            {data.projects.map((project, index) => (
              <li key={index}>{project}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="resume-section">
          <h2>Certifications</h2>
          <ul className="item-list">
            {' '}
            {data.certifications.map((cert, index) => (
              <li key={index}>{cert}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages*/}
      {data.languages && data.languages.length > 0 && (
        <section className="resume-section">
          <h2>Languages</h2>
          <ul className="item-list">
            {data.languages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default ResultDisplay
