'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { XCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

const MIN_CONTENT_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;

const RESUME_KEYWORDS = [
  'experience',
  'education',
  'skills',
  'work',
  'job',
  'university',
  'college',
  'degree',
  'certification',
  'project',
  'achievement',
  'responsibility',
  'duties',
  'role',
  'position'
];

const safeBtoa = (str: string): string => {
  try {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (error) {
    console.error('Error encoding data:', error);
    throw new Error('Failed to encode data');
  }
};

export default function Home() {
  const router = useRouter();
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const validateResumeContent = (content: string): { isValid: boolean; error?: string } => {
    if (content.length < MIN_CONTENT_LENGTH) {
      return {
        isValid: false,
        error: `Resume content is too short. Minimum ${MIN_CONTENT_LENGTH} characters required.`
      };
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return {
        isValid: false,
        error: `Resume content is too long. Maximum ${MAX_CONTENT_LENGTH} characters allowed.`
      };
    }

    const contentLower = content.toLowerCase();
    const foundKeywords = RESUME_KEYWORDS.filter(keyword => 
      contentLower.includes(keyword.toLowerCase())
    );

    if (foundKeywords.length < 3) {
      return {
        isValid: false,
        error: 'Content does not appear to be a resume. Please ensure it contains information about experience, education, or skills.'
      };
    }

    const nonResumePatterns = [
      /^[0-9\s]+$/,
      /^[a-zA-Z\s]+$/,
      /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
      /^https?:\/\//,
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    ];

    for (const pattern of nonResumePatterns) {
      if (pattern.test(content)) {
        return {
          isValid: false,
          error: 'Content appears to be invalid. Please provide a proper resume.'
        };
      }
    }

    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const validation = validateResumeContent(resumeText);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        throw new Error('Failed to parse resume');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.skills || !data.workExperience || !data.education) {
        throw new Error('Invalid data structure received from API');
      }

      const jsonString = JSON.stringify(data);
      const base64Data = safeBtoa(jsonString);
      
      router.push(`/results?data=${base64Data}`);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Intelligent Resume Parser
          </h1>
          <p className="text-lg text-gray-600">
            Paste your resume content below and let our AI extract the key information
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                  Resume Content
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <InformationCircleIcon className="h-5 w-5" />
                  </button>
                  {showTooltip && (
                    <div className="absolute right-0 mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                      <p>Your resume should include:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Work experience</li>
                        <li>Education details</li>
                        <li>Skills and technologies</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <textarea
                id="resume"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-black"
                placeholder="Paste your resume content here..."
                required
                minLength={MIN_CONTENT_LENGTH}
                maxLength={MAX_CONTENT_LENGTH}
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {resumeText.length} / {MAX_CONTENT_LENGTH} characters
                </p>
                <p className="text-sm text-gray-500">
                  Minimum {MIN_CONTENT_LENGTH} characters required
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  'px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105',
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                )}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Parse Resume'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
              <div className="flex items-center text-red-600">
                <XCircleIcon className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
