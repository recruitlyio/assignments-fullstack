import { ParsedResume, ParseError, Skill, WorkExperience, Education, Certification, Language, Achievement, ContactInfo, Project, Publication, Patent, Volunteer, PersonalInfo } from '../types/resume';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { systemPrompt } from './openaiPrompt';

dotenv.config();

// Initialize OpenAI with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Use the imported systemPrompt
const SYSTEM_PROMPT = systemPrompt;

export class ResumeParser {
  // Standard degree name mapping
  private degreeAbbreviations: Record<string, string> = {
    "BS": "Bachelor of Science",
    "B.S.": "Bachelor of Science",
    "B.S": "Bachelor of Science",
    "BA": "Bachelor of Arts",
    "B.A.": "Bachelor of Arts",
    "B.A": "Bachelor of Arts",
    "MS": "Master of Science",
    "M.S.": "Master of Science",
    "M.S": "Master of Science",
    "MA": "Master of Arts",
    "M.A.": "Master of Arts",
    "M.A": "Master of Arts",
    "PHD": "Doctor of Philosophy",
    "Ph.D.": "Doctor of Philosophy",
    "Ph.D": "Doctor of Philosophy",
    "PhD": "Doctor of Philosophy",
    "MBA": "Master of Business Administration",
    "M.B.A.": "Master of Business Administration",
    "BE": "Bachelor of Engineering",
    "B.E.": "Bachelor of Engineering",
    "BTech": "Bachelor of Technology",
    "B.Tech": "Bachelor of Technology",
    "MTech": "Master of Technology",
    "M.Tech": "Master of Technology"
  };
  
  // Common skills with default proficiency levels
  private commonSkills: Record<string, string> = {
    "javascript": "Advanced",
    "typescript": "Advanced",
    "python": "Intermediate",
    "java": "Intermediate",
    "c++": "Intermediate",
    "c#": "Intermediate",
    "react": "Advanced",
    "angular": "Advanced",
    "vue": "Intermediate",
    "node.js": "Advanced",
    "express": "Advanced",
    "mongodb": "Intermediate",
    "sql": "Intermediate",
    "postgresql": "Intermediate",
    "mysql": "Intermediate",
    "git": "Advanced",
    "docker": "Intermediate",
    "kubernetes": "Beginner",
    "aws": "Intermediate",
    "azure": "Intermediate",
    "gcp": "Intermediate",
    "html": "Advanced",
    "css": "Advanced",
    "sass": "Intermediate",
    "redux": "Advanced",
    "graphql": "Intermediate",
    "rest api": "Advanced"
  };

  async parseResume(text: string): Promise<{ data: ParsedResume; errors: ParseError[] }> {
    try {
      let parsedData;
      
      try {
        // Create request to OpenAI
        console.log("Sending request to OpenAI with system prompt:", SYSTEM_PROMPT.substring(0, 100) + "...");
        
        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: text }
          ],
          model: 'gpt-4o',
          response_format: { type: 'json_object' },
        });
        
        const responseText = completion.choices[0].message.content || '{}';
        
        // Extract the JSON object from the response
        console.log("Raw model output:", responseText.substring(0, 500) + "...");
        
        try {
          // Parse the JSON response
          parsedData = JSON.parse(responseText);
          console.log("Successfully parsed response JSON");
        } catch (jsonError) {
          console.error("Error parsing JSON from OpenAI response:", jsonError);
          throw new Error("Failed to parse OpenAI response as JSON");
        }
      } catch (apiError) {
        console.error("OpenAI API error:", apiError);
        console.log("Falling back to rule-based parsing");
        parsedData = this.fallbackParsing(text);
      }
      
      // Enhance and standardize the extracted data
      console.log("Enhancing and standardizing parsed data");
      parsedData = this.enhanceAndStandardize(parsedData, text);

      // Validate the data and collect errors
      const errors = this.validateParsedData(parsedData);
      
      console.log("Validation complete. Found", errors.length, "errors/warnings");

      return {
        data: {
          ...parsedData,
          rawText: text
        },
        errors
      };
    } catch (error) {
      console.error('Error parsing resume:', error);
      // Last resort fallback
      const fallbackData = this.fallbackParsing(text);
      return {
        data: {
          ...fallbackData,
          rawText: text
        },
        errors: [{
          field: 'api',
          message: 'Used fallback parsing due to API error',
          severity: 'warning'
        }]
      };
    }
  }
  
  private enhanceAndStandardize(data: any, originalText: string): Omit<ParsedResume, 'rawText'> {
    // Start with the AI-extracted data
    const enhancedData = { ...data };
    
    // Ensure contactInfo exists and has required fields
    if (!enhancedData.contactInfo) {
      enhancedData.contactInfo = { name: 'Unknown' };
    } else if (!enhancedData.contactInfo.name) {
      enhancedData.contactInfo.name = this.extractName(originalText) || 'Unknown';
    }
    
    // Ensure all required arrays exist
    if (!Array.isArray(enhancedData.skills)) {
      enhancedData.skills = [];
    }
    
    if (!Array.isArray(enhancedData.workExperience)) {
      enhancedData.workExperience = [];
    }
    
    if (!Array.isArray(enhancedData.education)) {
      enhancedData.education = [];
    }
    
    if (!Array.isArray(enhancedData.projects)) {
      enhancedData.projects = [];
    }
    
    if (!Array.isArray(enhancedData.certifications)) {
      enhancedData.certifications = [];
    }
    
    if (!Array.isArray(enhancedData.languages)) {
      enhancedData.languages = [];
    }
    
    if (!Array.isArray(enhancedData.achievements)) {
      enhancedData.achievements = [];
    }
    
    if (!Array.isArray(enhancedData.interests)) {
      enhancedData.interests = [];
    }
    
    // Ensure optional arrays exist if data is present
    if (!Array.isArray(enhancedData.publications)) {
      enhancedData.publications = [];
    }
    
    if (!Array.isArray(enhancedData.patents)) {
      enhancedData.patents = [];
    }
    
    if (!Array.isArray(enhancedData.volunteer)) {
      enhancedData.volunteer = [];
    }
    
    // Initialize personalInfo if it doesn't exist
    if (!enhancedData.personalInfo) {
      enhancedData.personalInfo = {};
    }
    
    // Extract additional contact information if missing
    this.enhanceContactInfo(enhancedData, originalText);
    
    // 1. Enhance Skills
    this.enhanceSkills(enhancedData, originalText);
    
    // 2. Standardize Work Experience
    this.standardizeWorkExperience(enhancedData);
    
    // 3. Standardize Education
    this.standardizeEducation(enhancedData);
    
    // 4. Ensure summary exists
    if (!enhancedData.summary) {
      enhancedData.summary = this.extractSummary(originalText) || '';
    }
    
    // 5. Standardize Projects
    this.standardizeProjects(enhancedData);
    
    // 6. Standardize Certifications
    this.standardizeCertifications(enhancedData);
    
    // 7. Standardize Publications
    this.standardizePublications(enhancedData);
    
    // 8. Standardize Patents
    this.standardizePatents(enhancedData);
    
    // 9. Standardize Volunteer Experience
    this.standardizeVolunteer(enhancedData);
    
    return enhancedData;
  }
  
  private enhanceSkills(data: any, originalText: string): void {
    // Extract skills that might have been missed by the AI
    const lowerCaseText = originalText.toLowerCase();
    
    // Check for common skills in the text that might have been missed
    for (const [skill, defaultProficiency] of Object.entries(this.commonSkills)) {
      // Check if the skill is mentioned in the resume
      if (lowerCaseText.includes(skill) || lowerCaseText.includes(skill.replace('.', ''))) {
        // Check if the skill is already in the list
        const skillExists = data.skills.some((s: Skill) => 
          s.name.toLowerCase() === skill || 
          s.name.toLowerCase().replace('.', '') === skill.replace('.', '')
        );
        
        // If not found, add it
        if (!skillExists) {
          const yearsMatch = new RegExp(`(\\d+)\\s*(?:year(?:s)?|yr(?:s)?)\\s*(?:of)?\\s*(?:experience)?\\s*(?:with|in)?\\s*${skill}`, 'i').exec(lowerCaseText);
          const yearsOfExperience = yearsMatch ? parseInt(yearsMatch[1]) : undefined;
          
          data.skills.push({
            name: skill.charAt(0).toUpperCase() + skill.slice(1),
            proficiency: defaultProficiency as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
            yearsOfExperience
          });
        }
      }
    }
    
    // Standardize proficiency levels
    data.skills.forEach((skill: Skill) => {
      if (!skill.proficiency || !['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.proficiency)) {
        // Determine proficiency based on years of experience
        if (skill.yearsOfExperience !== undefined) {
          if (skill.yearsOfExperience <= 1) skill.proficiency = 'Beginner';
          else if (skill.yearsOfExperience <= 3) skill.proficiency = 'Intermediate';
          else if (skill.yearsOfExperience <= 5) skill.proficiency = 'Advanced';
          else skill.proficiency = 'Expert';
        } else {
          // Default to Intermediate if no other information
          skill.proficiency = 'Intermediate';
        }
      }
    });
  }
  
  private standardizeWorkExperience(data: any): void {
    // Standardize dates and format descriptions
    data.workExperience.forEach((exp: WorkExperience) => {
      // Standardize dates to YYYY-MM format
      exp.startDate = this.standardizeDate(exp.startDate);
      exp.endDate = exp.endDate === 'Present' ? 'Present' : this.standardizeDate(exp.endDate);
      
      // Ensure description is an array
      if (!Array.isArray(exp.description)) {
        exp.description = exp.description ? [exp.description] : [];
      }
      
      // If description is empty but we have other info, create a basic description
      if (exp.description.length === 0) {
        exp.description = [`Worked as ${exp.position} at ${exp.company}`];
      }
    });
    
    // Sort work experience by date (most recent first)
    data.workExperience.sort((a: WorkExperience, b: WorkExperience) => {
      if (a.endDate === 'Present') return -1;
      if (b.endDate === 'Present') return 1;
      return b.startDate.localeCompare(a.startDate);
    });
  }
  
  private standardizeEducation(data: any): void {
    // Standardize education details
    data.education.forEach((edu: Education) => {
      // Standardize degree names
      if (edu.degree) {
        const key = edu.degree.toUpperCase().replace(/\s+/g, '');
        if (this.degreeAbbreviations[key]) {
          edu.degree = this.degreeAbbreviations[key];
        } else if (this.degreeAbbreviations[edu.degree]) {
          edu.degree = this.degreeAbbreviations[edu.degree];
        }
      }
      
      // Standardize dates
      edu.startDate = this.standardizeDate(edu.startDate);
      edu.endDate = edu.endDate === 'Present' ? 'Present' : this.standardizeDate(edu.endDate);
    });
    
    // Sort education by date (most recent first)
    data.education.sort((a: Education, b: Education) => {
      if (a.endDate === 'Present') return -1;
      if (b.endDate === 'Present') return 1;
      return b.endDate.localeCompare(a.endDate);
    });
  }
  
  private standardizeDate(dateStr: string): string {
    if (!dateStr) return '';
    
    // Already in YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    try {
      // Handle different date formats
      
      // YYYY/MM or YYYY-MM with incorrect order
      const yyyyMm = /^(\d{4})[\/\-](\d{1,2})$/.exec(dateStr);
      if (yyyyMm) {
        const month = yyyyMm[2].padStart(2, '0');
        return `${yyyyMm[1]}-${month}`;
      }
      
      // MM/YYYY or MM-YYYY
      const mmYyyy = /^(\d{1,2})[\/\-](\d{4})$/.exec(dateStr);
      if (mmYyyy) {
        const month = mmYyyy[1].padStart(2, '0');
        return `${mmYyyy[2]}-${month}`;
      }
      
      // YYYY/MM/DD or YYYY-MM-DD
      const yyyyMmDd = /^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/.exec(dateStr);
      if (yyyyMmDd) {
        const month = yyyyMmDd[2].padStart(2, '0');
        return `${yyyyMmDd[1]}-${month}`;
      }
      
      // MM/DD/YYYY or MM-DD-YYYY
      const mmDdYyyy = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.exec(dateStr);
      if (mmDdYyyy) {
        const month = mmDdYyyy[1].padStart(2, '0');
        return `${mmDdYyyy[3]}-${month}`;
      }
      
      // Month YYYY (e.g., January 2020)
      const monthYyyy = /^([a-zA-Z]+)\s+(\d{4})$/i.exec(dateStr);
      if (monthYyyy) {
        const months: Record<string, string> = {
          'january': '01', 'february': '02', 'march': '03', 'april': '04',
          'may': '05', 'june': '06', 'july': '07', 'august': '08',
          'september': '09', 'october': '10', 'november': '11', 'december': '12',
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
          'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        
        const month = months[monthYyyy[1].toLowerCase()];
        if (month) {
          return `${monthYyyy[2]}-${month}`;
        }
      }
      
      // Year only
      const yearOnly = /^(\d{4})$/.exec(dateStr);
      if (yearOnly) {
        return `${yearOnly[1]}-01`; // Default to January
      }
      
      // If date is in format DD/MM/YYYY
      const ddMmYyyy = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.exec(dateStr);
      if (ddMmYyyy && parseInt(ddMmYyyy[1]) <= 31 && parseInt(ddMmYyyy[2]) <= 12) {
        const month = ddMmYyyy[2].padStart(2, '0');
        return `${ddMmYyyy[3]}-${month}`;
      }
      
      // Present or Current
      if (/present|current/i.test(dateStr)) {
        return 'Present';
      }
      
      // Try to extract year and month from a string with various formats
      const yearMatch = /(?:^|\s)(\d{4})(?:\s|$)/.exec(dateStr);
      const monthMatch = /(?:^|\s)(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)(?:\s|$)/i.exec(dateStr);
      
      if (yearMatch && monthMatch) {
        const months: Record<string, string> = {
          'january': '01', 'february': '02', 'march': '03', 'april': '04',
          'may': '05', 'june': '06', 'july': '07', 'august': '08',
          'september': '09', 'october': '10', 'november': '11', 'december': '12',
          'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
          'jun': '06', 'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
        };
        
        const month = months[monthMatch[1].toLowerCase()];
        if (month) {
          return `${yearMatch[1]}-${month}`;
        }
      }
    } catch (error) {
      console.error("Error standardizing date:", error);
    }
    
    // If all else fails, return the original
    return dateStr;
  }

  private validateParsedData(data: any): ParseError[] {
    const errors: ParseError[] = [];

    // Validate overall structure
    if (!data) {
      errors.push({
        field: 'data',
        message: 'No data could be extracted from the resume',
        severity: 'error'
      });
      return errors;
    }

    // Validate skills
    if (!Array.isArray(data.skills)) {
      errors.push({
        field: 'skills',
        message: 'Skills must be an array',
        severity: 'error'
      });
    } else if (data.skills.length === 0) {
      errors.push({
        field: 'skills',
        message: 'No skills were detected in the resume',
        severity: 'warning'
      });
    } else {
      // Validate each skill
      data.skills.forEach((skill: Skill, index: number) => {
        if (!skill.name) {
          errors.push({
            field: `skills[${index}].name`,
            message: 'Skill name is missing',
            severity: 'error'
          });
        }
        
        if (!skill.proficiency) {
          errors.push({
            field: `skills[${index}].proficiency`,
            message: `Proficiency level for ${skill.name || 'skill'} is missing`,
            severity: 'warning'
          });
        } else if (!['Beginner', 'Intermediate', 'Advanced', 'Expert'].includes(skill.proficiency)) {
          errors.push({
            field: `skills[${index}].proficiency`,
            message: `Invalid proficiency level: ${skill.proficiency}`,
            severity: 'warning'
          });
        }
      });
    }

    // Validate work experience
    if (!Array.isArray(data.workExperience)) {
      errors.push({
        field: 'workExperience',
        message: 'Work experience must be an array',
        severity: 'error'
      });
    } else if (data.workExperience.length === 0) {
      errors.push({
        field: 'workExperience',
        message: 'No work experience was detected in the resume',
        severity: 'warning'
      });
    } else {
      // Validate each work experience
      data.workExperience.forEach((exp: WorkExperience, index: number) => {
        if (!exp.company) {
          errors.push({
            field: `workExperience[${index}].company`,
            message: 'Company name is missing',
            severity: 'error'
          });
        }
        
        if (!exp.position) {
          errors.push({
            field: `workExperience[${index}].position`,
            message: 'Position title is missing',
            severity: 'error'
          });
        }
        
        if (!exp.startDate) {
          errors.push({
            field: `workExperience[${index}].startDate`,
            message: `Start date for ${exp.position || 'position'} at ${exp.company || 'company'} is missing`,
            severity: 'warning'
          });
        }
        
        if (!exp.endDate) {
          errors.push({
            field: `workExperience[${index}].endDate`,
            message: `End date for ${exp.position || 'position'} at ${exp.company || 'company'} is missing`,
            severity: 'warning'
          });
        }
        
        // Check for chronological inconsistencies
        if (exp.startDate && exp.endDate && exp.endDate !== 'Present') {
          if (exp.startDate > exp.endDate) {
            errors.push({
              field: `workExperience[${index}].dates`,
              message: `Start date (${exp.startDate}) is after end date (${exp.endDate})`,
              severity: 'error'
            });
          }
        }
      });
    }

    // Validate education
    if (!Array.isArray(data.education)) {
      errors.push({
        field: 'education',
        message: 'Education must be an array',
        severity: 'error'
      });
    } else if (data.education.length === 0) {
      errors.push({
        field: 'education',
        message: 'No education was detected in the resume',
        severity: 'warning'
      });
    } else {
      // Validate each education
      data.education.forEach((edu: Education, index: number) => {
        if (!edu.institution) {
          errors.push({
            field: `education[${index}].institution`,
            message: 'Institution name is missing',
            severity: 'error'
          });
        }
        
        if (!edu.degree) {
          errors.push({
            field: `education[${index}].degree`,
            message: `Degree for ${edu.institution || 'institution'} is missing`,
            severity: 'warning'
          });
        }
        
        if (!edu.fieldOfStudy) {
          errors.push({
            field: `education[${index}].fieldOfStudy`,
            message: `Field of study for ${edu.degree || 'degree'} at ${edu.institution || 'institution'} is missing`,
            severity: 'warning'
          });
        }
        
        // Check for chronological inconsistencies
        if (edu.startDate && edu.endDate && edu.endDate !== 'Present') {
          if (edu.startDate > edu.endDate) {
            errors.push({
              field: `education[${index}].dates`,
              message: `Start date (${edu.startDate}) is after end date (${edu.endDate})`,
              severity: 'error'
            });
          }
        }
      });
    }

    return errors;
  }

  private fallbackParsing(text: string): Omit<ParsedResume, 'rawText'> {
    // Rule-based parsing as a fallback when AI is unavailable
    const skills: Skill[] = [];
    const workExperience: WorkExperience[] = [];
    const education: Education[] = [];
    const projects: Project[] = [];
    const certifications: Certification[] = [];
    const languages: Language[] = [];
    const achievements: Achievement[] = [];
    const interests: string[] = [];
    
    // Extract contact info
    const contactInfo: ContactInfo = {
      name: this.extractName(text) || 'Unknown',
      email: this.extractEmail(text),
      phone: this.extractPhone(text),
      location: this.extractLocation(text),
      linkedin: this.extractSocialProfile(text, 'linkedin'),
      github: this.extractSocialProfile(text, 'github')
    };
    
    // Extract summary
    const summary = this.extractSummary(text);
    
    // Extract skills
    const skillsSection = this.extractSection(text, ['skills', 'technologies', 'technical skills']);
    if (skillsSection) {
      // Look for skills in the skills section
      for (const [skill, proficiency] of Object.entries(this.commonSkills)) {
        if (skillsSection.toLowerCase().includes(skill)) {
          skills.push({
            name: skill.charAt(0).toUpperCase() + skill.slice(1),
            proficiency: proficiency as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
            yearsOfExperience: undefined,
            category: this.determineSkillCategory(skill)
          });
        }
      }
    }
    
    // Extract work experience
    const experienceSection = this.extractSection(text, ['experience', 'work experience', 'employment', 'professional experience']);
    if (experienceSection) {
      // Simple regex to find job titles and companies
      const jobPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:at|@|with|for)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g;
      let match;
      
      while ((match = jobPattern.exec(experienceSection)) !== null) {
        const position = match[1];
        const company = match[2];
        
        // Look for dates near this job
        const datePattern = /(\d{2}\/\d{4}|\d{2}-\d{4}|\d{4}\/\d{2}|\d{4}-\d{2}|\d{4})/g;
        const dateMatches = [...experienceSection.matchAll(datePattern)];
        
        let startDate = '';
        let endDate = 'Present';
        
        if (dateMatches.length >= 2) {
          startDate = String(dateMatches[0][0]);
          endDate = String(dateMatches[1][0]);
        } else if (dateMatches.length === 1) {
          startDate = String(dateMatches[0][0]);
        }
        
        // Extract potential technologies from this experience
        const technologies = this.extractTechnologies(experienceSection);
        
        workExperience.push({
          company,
          position,
          startDate: this.standardizeDate(startDate),
          endDate: endDate === 'Present' ? 'Present' : this.standardizeDate(endDate),
          description: [`Worked as ${position} at ${company}`],
          location: '',
          technologies
        });
      }
    }
    
    // Extract education
    const educationSection = this.extractSection(text, ['education', 'academic background', 'qualifications']);
    if (educationSection) {
      // Look for degree names
      for (const [abbr, degreeName] of Object.entries(this.degreeAbbreviations)) {
        if (educationSection.includes(abbr) || educationSection.includes(degreeName)) {
          // Look for institution names (uppercase words)
          const institutionPattern = /([A-Z][a-z]*(?:\s+[A-Z][a-z]*)+(?:\s+University|College|Institute|School))/g;
          const institutionMatch = institutionPattern.exec(educationSection);
          
          if (institutionMatch) {
            // Look for field of study
            const fieldPattern = /in\s+([A-Z][a-z]+(?:\s+[A-Za-z]+)*)/;
            const fieldMatch = educationSection.match(fieldPattern);
            
            education.push({
              institution: institutionMatch[1],
              degree: degreeName,
              fieldOfStudy: fieldMatch ? fieldMatch[1] : 'Not specified',
              startDate: '',
              endDate: '',
              location: ''
            });
          }
        }
      }
    }
    
    // Extract projects
    const projectsSection = this.extractSection(text, ['projects', 'personal projects', 'side projects']);
    if (projectsSection) {
      // Simple regex to find project names
      const projectPattern = /(?:Project|Built|Developed|Created):\s*([A-Z][a-z]+(?:\s+[A-Za-z]+)*)/g;
      let projectMatch;
      
      while ((projectMatch = projectPattern.exec(projectsSection)) !== null) {
        const projectName = projectMatch[1];
        const projectContext = projectsSection.substring(projectMatch.index, projectMatch.index + 200);
        
        projects.push({
          name: projectName,
          description: `Project ${projectName}`,
          technologies: this.extractTechnologies(projectContext),
          role: 'Developer'
        });
      }
    }
    
    // Extract certifications
    const certSection = this.extractSection(text, ['certifications', 'certificates', 'credentials']);
    if (certSection) {
      // Simple regex to find certification names
      const certPattern = /([A-Z][a-z]+(?:\s+[A-Za-z]+)*)\s+(?:Certification|Certificate|Certified)/g;
      let certMatch;
      
      while ((certMatch = certPattern.exec(certSection)) !== null) {
        certifications.push({
          name: certMatch[1],
          issuer: 'Unknown',
          date: ''
        });
      }
    }
    
    // Extract languages
    const langSection = this.extractSection(text, ['languages', 'language skills']);
    if (langSection) {
      const languageNames = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Hindi', 'Portuguese'];
      
      for (const lang of languageNames) {
        if (langSection.includes(lang)) {
          languages.push({
            name: lang,
            proficiency: 'Proficient'
          });
        }
      }
    }
    
    return {
      contactInfo,
      summary,
      skills,
      workExperience,
      education,
      projects,
      certifications,
      languages,
      achievements,
      interests
    };
  }
  
  private extractName(text: string): string | undefined {
    // Look for a name at the beginning of the text (first line)
    const lines = text.split('\n');
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine && /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)+$/.test(firstLine)) {
        return firstLine;
      }
    }
    
    // Look for common name patterns
    const namePattern = /(?:^|\n)([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})(?:\n|$)/;
    const nameMatch = text.match(namePattern);
    if (nameMatch) {
      return nameMatch[1];
    }
    
    return undefined;
  }
  
  private extractEmail(text: string): string | undefined {
    const emailPattern = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    const emailMatch = text.match(emailPattern);
    return emailMatch ? emailMatch[1] : undefined;
  }
  
  private extractPhone(text: string): string | undefined {
    const phonePattern = /(\+?\d{1,3}[-. ]?\(?\d{1,3}\)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9})/;
    const phoneMatch = text.match(phonePattern);
    return phoneMatch ? phoneMatch[1] : undefined;
  }
  
  private extractLocation(text: string): string | undefined {
    // Common city/state/country pattern
    const locationPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)(?:,\s+)([A-Z][a-z]+|[A-Z]{2})(?:,\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)?/;
    const locationMatch = text.match(locationPattern);
    if (locationMatch) {
      return locationMatch[0];
    }
    return undefined;
  }
  
  private extractSocialProfile(text: string, platform: string): string | undefined {
    // Look for LinkedIn/Github URLs
    const urlPattern = new RegExp(`(?:${platform}\\.com|${platform}\\.[a-z]+\\/)[\\w\\-\\.\\~\\:\\/\\?\\#\\[\\]\\@\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]+`, 'i');
    const urlMatch = text.match(urlPattern);
    return urlMatch ? urlMatch[0] : undefined;
  }
  
  private extractSummary(text: string): string | undefined {
    // Try to extract a summary/profile section
    const summarySection = this.extractSection(text, ['summary', 'profile', 'objective', 'about', 'professional summary']);
    
    // If we found a summary section, use it as a base
    if (summarySection) {
      // Use the first paragraph as summary
      const paragraphs = summarySection.split('\n\n');
      if (paragraphs.length > 0) {
        return paragraphs[0].trim();
      }
    }
    
    // If no explicit summary section, generate one from the resume
    // Extract name, most recent job title and company
    const name = this.extractName(text) || 'Professional';
    
    // Find skills
    const skills: string[] = [];
    for (const skill of Object.keys(this.commonSkills)) {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    }
    
    // Find years of experience
    let yearsOfExperience = 0;
    const experiencePatterns = [
      /(\d+)\+?\s*(?:years|yrs)(?:\s*of\s*|\s+)(?:experience|exp)/i,
      /experience\D*(\d+)\+?\s*(?:years|yrs)/i,
      /(\d+)-year(?:\s+|\s*-\s*)(?:experience|exp)/i
    ];
    
    for (const pattern of experiencePatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        yearsOfExperience = parseInt(match[1], 10);
        break;
      }
    }
    
    // Extract most recent job title
    let jobTitle = 'Professional';
    const jobTitleSection = this.extractSection(text, ['experience', 'employment', 'work experience', 'professional experience']);
    if (jobTitleSection) {
      const lines = jobTitleSection.split('\n');
      for (const line of lines.slice(0, 5)) {  // Look at first few lines
        if (line.includes('Engineer') || line.includes('Developer') || line.includes('Manager') || 
            line.includes('Director') || line.includes('Lead')) {
          jobTitle = line.trim().split(/[,:]/, 1)[0].trim();
          break;
        }
      }
    }
    
    // Get top skills (maximum 5)
    const topSkills = skills.slice(0, 5);
    const skillsText = topSkills.length > 0 
      ? `specializing in ${topSkills.join(', ')}` 
      : 'with expertise in various technologies';
    
    // Generate a generic but meaningful summary
    const experienceText = yearsOfExperience > 0 
      ? `with ${yearsOfExperience}+ years of experience` 
      : 'with extensive experience';
    
    return `${jobTitle} ${experienceText} ${skillsText}. Demonstrated track record of delivering high-quality solutions, collaborating effectively with cross-functional teams, and adapting quickly to new technologies and methodologies.`;
  }
  
  private extractTechnologies(text: string): string[] {
    const technologies: string[] = [];
    
    // Look for common technologies in the text
    for (const skill of Object.keys(this.commonSkills)) {
      if (text.toLowerCase().includes(skill)) {
        technologies.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    }
    
    return technologies;
  }
  
  private determineSkillCategory(skill: string): string {
    // Map skills to categories
    const categories: Record<string, string[]> = {
      'Frontend': ['javascript', 'typescript', 'react', 'vue', 'angular', 'html', 'css', 'sass', 'redux'],
      'Backend': ['node.js', 'express', 'java', 'python', 'c#', 'php', 'ruby'],
      'Database': ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'firebase'],
      'DevOps': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jenkins'],
      'Mobile': ['react native', 'flutter', 'swift', 'kotlin', 'android', 'ios'],
      'Design': ['figma', 'sketch', 'photoshop', 'illustrator', 'ui', 'ux'],
      'Other': []
    };
    
    // Find the category that contains this skill
    for (const [category, skills] of Object.entries(categories)) {
      if (skills.includes(skill)) {
        return category;
      }
    }
    
    return 'Other';
  }
  
  private extractSection(text: string, sectionNames: string[]): string | null {
    const lines = text.split('\n');
    let inSection = false;
    let sectionContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      
      // Check if this line is a section header
      const isSectionHeader = sectionNames.some(name => 
        line.includes(name.toLowerCase()) || 
        line === name.toLowerCase() ||
        line.startsWith(`${name.toLowerCase()}:`) ||
        line.endsWith(`${name.toLowerCase()}`)
      );
      
      if (isSectionHeader) {
        inSection = true;
        continue;
      }
      
      // Check if we've reached the next section
      if (inSection && line.length > 0 && /^[A-Z]/.test(lines[i]) && lines[i].includes(':')) {
        break;
      }
      
      if (inSection) {
        sectionContent += lines[i] + '\n';
      }
    }
    
    return sectionContent.trim() || null;
  }
  
  private standardizeProjects(data: any): void {
    // Standardize project details
    data.projects.forEach((project: Project) => {
      // Ensure description exists
      if (!project.description) {
        project.description = `Project: ${project.name}`;
      }
      
      // Standardize dates if present
      if (project.startDate) {
        project.startDate = this.standardizeDate(project.startDate);
      }
      
      if (project.endDate) {
        project.endDate = project.endDate === 'Present' ? 'Present' : this.standardizeDate(project.endDate);
      }
      
      // Ensure technologies is an array
      if (!Array.isArray(project.technologies)) {
        project.technologies = project.technologies ? [project.technologies] : [];
      }
    });
  }
  
  private standardizeCertifications(data: any): void {
    // Standardize certification details
    data.certifications.forEach((cert: Certification) => {
      // Standardize date
      if (cert.date) {
        cert.date = this.standardizeDate(cert.date);
      } else {
        cert.date = ''; // Provide empty string instead of undefined
      }
      
      // Standardize expiration date if present
      if (cert.expiration) {
        cert.expiration = this.standardizeDate(cert.expiration);
      }
    });
  }

  private enhanceContactInfo(data: any, originalText: string): void {
    const contactInfo = data.contactInfo || {};
    
    // Try to extract missing email
    if (!contactInfo.email) {
      contactInfo.email = this.extractEmail(originalText);
    }
    
    // Try to extract missing phone
    if (!contactInfo.phone) {
      contactInfo.phone = this.extractPhone(originalText);
    }
    
    // Try to extract missing location
    if (!contactInfo.location) {
      contactInfo.location = this.extractLocation(originalText);
    }
    
    // Try to extract social profiles
    if (!contactInfo.linkedin) {
      contactInfo.linkedin = this.extractSocialProfile(originalText, 'linkedin');
    }
    
    if (!contactInfo.github) {
      contactInfo.github = this.extractSocialProfile(originalText, 'github');
    }
    
    if (!contactInfo.twitter) {
      contactInfo.twitter = this.extractSocialProfile(originalText, 'twitter');
    }
    
    if (!contactInfo.instagram) {
      contactInfo.instagram = this.extractSocialProfile(originalText, 'instagram');
    }
    
    // Extract website if it's not a known social profile
    if (!contactInfo.website) {
      const websitePattern = /https?:\/\/(?!(?:www\.)?(?:linkedin|github|twitter|instagram|medium|stackoverflow)\.com)[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[^\s]*)?/i;
      const websiteMatch = originalText.match(websitePattern);
      contactInfo.website = websiteMatch ? websiteMatch[0] : undefined;
    }
    
    data.contactInfo = contactInfo;
  }

  private standardizePublications(data: any): void {
    // Standardize publication details
    data.publications.forEach((pub: Publication) => {
      // Standardize date
      if (pub.date) {
        pub.date = this.standardizeDate(pub.date);
      } else {
        pub.date = ''; // Provide empty string instead of undefined
      }
      
      // Ensure authors is an array
      if (!Array.isArray(pub.authors)) {
        pub.authors = pub.authors ? [pub.authors] : [];
      }
    });
  }
  
  private standardizePatents(data: any): void {
    // Standardize patent details
    data.patents.forEach((patent: Patent) => {
      // Standardize date
      if (patent.date) {
        patent.date = this.standardizeDate(patent.date);
      } else {
        patent.date = ''; // Provide empty string instead of undefined
      }
    });
  }
  
  private standardizeVolunteer(data: any): void {
    // Standardize volunteer experience details
    data.volunteer.forEach((vol: Volunteer) => {
      // Standardize dates
      vol.startDate = this.standardizeDate(vol.startDate);
      vol.endDate = vol.endDate === 'Present' ? 'Present' : this.standardizeDate(vol.endDate);
      
      // Ensure description is an array
      if (!Array.isArray(vol.description)) {
        vol.description = vol.description ? [vol.description] : [];
      }
    });
  }
}