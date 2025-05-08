export const jobDescription = {
  role: "Senior Software Engineer",
  company: "TechInnovate Solutions",
  location: "Remote (US-based)",
  description:
    "We're looking for a Senior Software Engineer to join our growing team. You'll be responsible for designing, developing, and maintaining our core product features, collaborating with cross-functional teams, and mentoring junior developers.",
  requiredSkills: [
    "5+ years of experience in software development",
    "Strong proficiency in JavaScript/TypeScript",
    "Experience with React and modern frontend frameworks",
    "Knowledge of backend technologies (Node.js, Express)",
    "Experience with database design and management (SQL, NoSQL)",
    "Understanding of CI/CD pipelines and DevOps practices",
  ],
  preferredQualifications: [
    "Experience with cloud platforms (AWS, Azure, GCP)",
    "Knowledge of containerization technologies (Docker, Kubernetes)",
    "Experience with microservices architecture",
    "Contributions to open-source projects",
    "Experience with agile development methodologies",
  ],
  responsibilities: [
    "Design, develop, and maintain software applications",
    "Collaborate with product managers and designers to define feature specifications",
    "Write clean, maintainable, and efficient code",
    "Perform code reviews and provide constructive feedback",
    "Troubleshoot and debug applications",
    "Mentor junior developers and contribute to team growth",
  ],
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible work hours and remote-first culture",
    "Professional development budget",
    "Home office stipend",
    "Unlimited PTO policy",
  ],
  applicationProcess:
    "Our interview process consists of an initial screening call, a technical assessment, and a final round of interviews with the team and leadership.",
}

export const jobDescriptionText = `
Role: ${jobDescription.role}
Company: ${jobDescription.company}
Location: ${jobDescription.location}

Description:
${jobDescription.description}

Required Skills:
${jobDescription.requiredSkills.map((skill) => `- ${skill}`).join("\n")}

Preferred Qualifications:
${jobDescription.preferredQualifications.map((qual) => `- ${qual}`).join("\n")}

Responsibilities:
${jobDescription.responsibilities.map((resp) => `- ${resp}`).join("\n")}

Benefits:
${jobDescription.benefits.map((benefit) => `- ${benefit}`).join("\n")}

Application Process:
${jobDescription.applicationProcess}
`
