import React, { useState } from 'react';
import { parseResume } from './services/api';
import { ParsedResume, ParseError } from './types/resume';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingAnimation from './components/LoadingAnimation';
import TabNavigation from './components/TabNavigation';
import SkillBadgeList from './components/SkillBadgeList';
import ProcessingNotes from './components/ProcessingNotes';
import ErrorMessages from './components/ErrorMessages';
import ErrorNotification from './components/ErrorNotification';
import SkillsPieChart from './components/SkillsPieChart';
import ResumeSummaryBox from './components/ResumeSummaryBox';

function App() {
  const [resumeText, setResumeText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [processingNotes, setProcessingNotes] = useState<string[]>([
    'Extracted contact information',
    'Identified skills and proficiency levels',
    'Parsed work experience entries',
    'Analyzed education history'
  ]);

  const handleParse = async () => {
    if (!resumeText.trim()) {
      setError('Please enter resume text');
      return;
    }

    setLoading(true);
    setError(null);
    setParsedData(null);
    setErrors([]);

    try {
      const response = await parseResume(resumeText);
      setParsedData(response.data);
      setErrors(response.errors);
    } catch (err) {
      setError('Failed to parse resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          :root {
            --beginner-bg: #e6f7ff;
            --beginner-text: #0077b6;
            --intermediate-bg: #e3f8e9;
            --intermediate-text: #087f5b;
            --advanced-bg: #f0e7fe;
            --advanced-text: #6741d9;
            --expert-bg: #fce7f3;
            --expert-text: #d53f8c;
          }
          
          @media print {
            body {
              width: 210mm;
              height: 297mm;
            }
          }
          
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          .animate-blink {
            animation: blink 1s infinite;
          }
        `}
      </style>
      
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex flex-col items-center">
        {/* Input Section */}
        <div className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Paste Your Resume
          </h2>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />

          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            onClick={handleParse}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="h-10 w-10">
                    <div className="absolute h-10 w-10 rounded-full border-4 border-t-indigo-500 border-b-violet-700 border-l-indigo-500 border-r-violet-700 animate-spin"></div>
                    <div className="absolute h-10 w-10 rounded-full border-4 border-transparent border-t-indigo-300 animate-pulse"></div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <span className="ml-2 text-white">Analyzing with AI...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Parse Resume
              </div>
            )}
          </button>

          <ErrorNotification message={error} />
          <ErrorMessages errors={errors} />
        </div>

        {/* Loading Animation and Processing Notes */}
        {loading && (
          <div className="w-full">
            <LoadingAnimation />
            <div className="mt-4">
              <ProcessingNotes notes={processingNotes} />
            </div>
          </div>
        )}

        {/* Output Section - A4 Paper Style */}
        {!loading && parsedData && (
          <>
            {/* Summary Box - Shows best project and top skills */}
            <div className="w-full mb-6">
              <ResumeSummaryBox data={parsedData} />
            </div>
            
            {/* Main Resume Content */}
            <div className="w-full max-w-[210mm] bg-white shadow-xl rounded-xl overflow-hidden mb-8 border border-gray-100">
              {/* Tabs Navigation */}
              <TabNavigation 
                tabs={[
                  { id: 'all', label: 'Overview' },
                  { id: 'skills', label: 'Skills' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'education', label: 'Education' }
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />

              {/* PDF-like Content */}
              <div className="p-8">
                {/* Contact Info */}
                {(activeTab === 'all' && parsedData.contactInfo) && (
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                      {parsedData.contactInfo.name}
                    </h2>
                    <div className="flex flex-wrap justify-center text-sm text-gray-600 mt-3 gap-x-6 gap-y-2">
                      {parsedData.contactInfo.email && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {parsedData.contactInfo.email}
                        </div>
                      )}
                      {parsedData.contactInfo.phone && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {parsedData.contactInfo.phone}
                        </div>
                      )}
                      {parsedData.contactInfo.location && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {parsedData.contactInfo.location}
                        </div>
                      )}
                      {parsedData.contactInfo.linkedin && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                          LinkedIn
                        </div>
                      )}
                      {parsedData.contactInfo.github && (
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Skills */}
                {(activeTab === 'all' || activeTab === 'skills') && parsedData.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Skills
                    </h3>
                    
                    {/* Skills Pie Chart - show on both overview and skills tab */}
                    <div className="mb-6">
                      <SkillsPieChart skills={parsedData.skills} />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      <SkillBadgeList skills={parsedData.skills} />
                    </div>
                  </div>
                )}
                
                {/* Work Experience - Only show in experience tab */}
                {activeTab === 'experience' && parsedData.workExperience.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-200">Work Experience</h3>
                    <div className="space-y-4">
                      {parsedData.workExperience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4 pb-2">
                          <div className="flex justify-between items-start flex-wrap">
                            <h4 className="font-medium text-gray-800">{exp.position}</h4>
                            <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1 sm:mt-0">
                              {exp.startDate} - {exp.endDate}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1 mb-2 flex items-center flex-wrap">
                            <span className="font-medium">{exp.company}</span>
                            {exp.location && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{exp.location}</span>
                              </>
                            )}
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {exp.description.map((desc, i) => (
                              <li key={i} className="leading-relaxed">{desc}</li>
                            ))}
                          </ul>
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="mt-2 flex flex-wrap">
                              {exp.technologies.map((tech, idx) => (
                                <span key={idx} className="mr-2 mb-1 px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Education - Only show in education tab */}
                {activeTab === 'education' && parsedData.education.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-200">Education</h3>
                    <div className="space-y-4">
                      {parsedData.education.map((edu, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4 pb-2">
                          <div className="flex justify-between items-start flex-wrap">
                            <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                            <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1 sm:mt-0">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <div className="font-medium">{edu.institution}</div>
                            <div className="mt-1">{edu.fieldOfStudy}</div>
                            {edu.location && <div className="mt-1">{edu.location}</div>}
                            {edu.gpa && <div className="mt-1">GPA: {edu.gpa}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Projects - Only show in experience tab */}
                {activeTab === 'experience' && parsedData.projects && parsedData.projects.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-200">Projects</h3>
                    <div className="space-y-4">
                      {parsedData.projects.map((project, index) => (
                        <div key={index} className="border-l-2 border-blue-200 pl-4 pb-2">
                          <div className="flex justify-between items-start flex-wrap">
                            <h4 className="font-medium text-gray-800">{project.name}</h4>
                            {project.startDate && (
                              <div className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded mt-1 sm:mt-0">
                                {project.startDate} {project.endDate && `- ${project.endDate}`}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {project.role && <div className="italic">{project.role}</div>}
                            <p className="mt-1">{project.description}</p>
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-1 inline-block"
                              >
                                View Project
                              </a>
                            )}
                          </div>
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-2 flex flex-wrap">
                              {project.technologies.map((tech, idx) => (
                                <span key={idx} className="mr-2 mb-1 px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Certifications - Only show in education tab */}
                {activeTab === 'education' && parsedData.certifications && parsedData.certifications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-200">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {parsedData.certifications.map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                          <h4 className="font-medium text-gray-800">{cert.name}</h4>
                          <div className="text-sm text-gray-600">
                            <div>{cert.issuer}</div>
                            <div>Issued: {cert.date}</div>
                            {cert.expiration && <div>Expires: {cert.expiration}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
