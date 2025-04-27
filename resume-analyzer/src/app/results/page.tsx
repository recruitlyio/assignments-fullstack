'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon, DocumentTextIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

interface ParsedResume {
  skills: Array<{
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }>;
  workExperience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: string;
  }>;
}

const proficiencyColors = {
  Beginner: 'bg-blue-100 text-blue-800',
  Intermediate: 'bg-green-100 text-green-800',
  Advanced: 'bg-yellow-100 text-yellow-800',
  Expert: 'bg-purple-100 text-purple-800',
};

const safeAtob = (str: string): string => {
  try {
    const binary = atob(str);
    
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch (error) {
    console.error('Error decoding data:', error);
    throw new Error('Failed to decode data');
  }
};

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const data = searchParams.get('data');
    console.log('Raw data from URL:', data);

    if (data) {
      try {
        const decodedData = safeAtob(data);
        console.log('Decoded data:', decodedData);

        const parsedData = JSON.parse(decodedData);
        console.log('Parsed data:', parsedData);

        if (!parsedData.skills || !parsedData.workExperience || !parsedData.education) {
          throw new Error('Invalid data structure: missing required fields');
        }

        setParsedData(parsedData);
      } catch (err) {
        console.error('Error parsing data:', err);
        if (err instanceof SyntaxError) {
          setError('Invalid JSON format in the data');
        } else if (err instanceof Error) {
          setError(`Failed to parse resume data: ${err.message}`);
        } else {
          setError('An unexpected error occurred while parsing the data');
        }
      }
    } else {
      setError('No resume data found in the URL');
    }
  }, [searchParams]);

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center text-red-600">
                <XCircleIcon className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Return to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!parsedData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parsed Resume Data</h1>
              <p className="text-gray-600 mt-1">Your resume has been successfully analyzed</p>
            </div>
            <a
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Parse Another Resume
            </a>
          </div>

          <div className="space-y-8">
            {/* Skills Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parsedData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${proficiencyColors[skill.proficiency]}`}>
                        {skill.proficiency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Work Experience Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
              </div>
              <div className="space-y-6">
                {parsedData.workExperience.map((exp, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{exp.role}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <AcademicCapIcon className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
              </div>
              <div className="space-y-4">
                {parsedData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mt-1">{edu.field}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {edu.graduationYear}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 