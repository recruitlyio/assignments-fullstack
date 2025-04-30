import { WorkExperience } from '@/types';
import { FC } from 'react'

interface ExperienceProps {
  workExperience: WorkExperience[];
}

const ExperienceComponent: FC<ExperienceProps> = ({ workExperience }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3  p-2 border border-gray-300">Work Experience</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {workExperience.map((work, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 font-medium">{work.role}</td>
                <td className="border border-gray-300 px-4 py-2">{work.company}</td>
                <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                  {work.startDate} - {work.endDate || "Present"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {work.description || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ExperienceComponent