import { Education } from '@/types';
import React, { FC } from 'react'

interface EducationProps {
  education: Education[];
}

const EducationComponent:FC<EducationProps> = ({education}) => {
  return (
    <div>
    <h3 className="text-xl font-semibold mb-3  p-2 border border-gray-300">Education</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="">
            <th className="border border-gray-300 px-4 py-2 text-left">Degree</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Institution</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Field of Study</th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu, index) => (
            <tr key={index} >
              <td className="border border-gray-300 px-4 py-2 font-medium">{edu.degree}</td>
              <td className="border border-gray-300 px-4 py-2">{edu.institution}</td>
              <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                {edu.startYear} - {edu.endYear || "Present"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {edu.fieldOfStudy || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default EducationComponent