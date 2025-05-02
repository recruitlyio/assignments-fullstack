import { Briefcase, BookOpen, Code, CheckCircle } from 'lucide-react';
import { Education, ParsedResumeData, Skill, WorkExperience } from '../types';

const ParsedDataDisplay = ({ data }: { data: ParsedResumeData }) => {
  if (!data) {
    return null;
  }

  const renderSkills = (skills: Skill[]) => {
    return (
      <div className='mb-8'>
        <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b border-blue-200 pb-2 flex items-center'>
          <Code className='mr-3 h-6 w-6 text-blue-500' />
          Skills
        </h3>
        {!skills?.length ? (
          <p className='text-base italic text-gray-500'>No skills parsed.</p>
        ) : (
          <ul className='flex flex-wrap gap-2'>
            {skills.map((skill, index) => (
              <li
                key={index}
                className='bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full'
              >
                {skill.name}
                {skill.proficiency && ` (${skill.proficiency})`}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  const renderWorkExperience = (experience: WorkExperience[]) => (
    <div className='mb-8'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b border-green-200 pb-2 flex items-center'>
        <Briefcase className='mr-3 h-6 w-6 text-green-500' /> Work Experience
      </h3>
      {!experience?.length ? (
        <p className='text-base italic text-gray-500'>No work experience parsed.</p>
      ) : (
        <div className='space-y-6'>
          {experience.map((job, index) => (
            <div key={index} className='pb-6 border-b border-gray-200 last:border-b-0 last:pb-0'>
              <p className='text-lg font-bold text-gray-900'>{job.title}</p>
              <p className='text-base text-gray-700 mt-1'>
                {job.company}
                {job.location && `, ${job.location}`}
              </p>
              {(job.startDate || job.endDate || job.duration) && (
                <p className='text-sm text-gray-500 mt-1'>
                  {job.startDate || ''} {job.startDate && job.endDate && '-'} {job.endDate || ''}
                  {job.duration && `(${job.duration})`}
                </p>
              )}
              {job.responsibilities && job.responsibilities?.length > 0 && (
                <ul className='list-none space-y-2 text-gray-700 mt-3'>
                  {job.responsibilities.map((resp, rIndex) => (
                    <li key={rIndex} className='flex items-start'>
                      <CheckCircle className='h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0' />
                      <span className='text-base'>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEducation = (education: Education[]) => (
    <div className='mb-8'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4 border-b border-purple-200 pb-2 flex items-center'>
        <BookOpen className='mr-3 h-6 w-6 text-purple-500' />
        Education
      </h3>
      {!education?.length ? (
        <p className='text-base italic text-gray-500'>No education parsed.</p>
      ) : (
        <div className='space-y-6'>
          {education.map((edu, index) => (
            <div key={index} className='pb-6 border-b border-gray-200 last:border-b-0 last:pb-0'>
              <p className='text-lg font-bold text-gray-900'>{edu.degree}</p>
              <p className='text-base text-gray-700 mt-1'>
                {edu.institution}
                {edu.location && `, ${edu.location}`}
              </p>
              {edu.yearText && <p className='text-sm text-gray-500 mt-1'>{edu.yearText}</p>}
              {edu.fieldOfStudy && <p className='text-sm text-gray-500 mt-1'>{edu.fieldOfStudy}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className='font-sans p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-3'>
          Parsed Resume Data
        </h2>
        {renderSkills(data.skills)}
        {renderWorkExperience(data.workExperience)}
        {renderEducation(data.education)}
      </div>
    </div>
  );
};

export default ParsedDataDisplay;
