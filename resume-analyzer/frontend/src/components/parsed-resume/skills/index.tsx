import { Skill } from '@/types'
import {FC} from 'react'

interface SkillsProps {
  skills: Skill[];
}

const SkillsComponent:FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 p-2 border border-gray-300">Skills</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Skill</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{skill.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{skill.proficiency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default SkillsComponent