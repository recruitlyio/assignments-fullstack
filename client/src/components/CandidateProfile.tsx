import React from "react";
import { CandidateInfo } from "../types";
import {
  FaUserTie,
  FaGraduationCap,
  FaTools,
  FaMedal,
  FaUser,
} from "react-icons/fa";

interface CandidateProfileProps {
  candidateInfo: CandidateInfo;
}

const CandidateProfile = ({ candidateInfo }: CandidateProfileProps) => {
  const { skills, experience, education, otherQualifications } = candidateInfo;

  const hasAnyInfo =
    (skills && skills.length > 0) ||
    (experience && experience.trim() !== "") ||
    (education && education.trim() !== "") ||
    (otherQualifications && otherQualifications.trim() !== "");

  if (!hasAnyInfo) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-full mb-6 flex items-center justify-center">
          <FaUserTie className="text-primary-600 text-4xl" />
        </div>
        <h2 className="text-xl font-semibold mb-3">Candidate Profile</h2>
        <p className="text-gray-500 max-w-md">
          Information about the candidate will appear here as they share details
          during the conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gradient-to-r from-[#e8eaf6] to-[#c5cae9] border-b border-gray-200 shadow-sm flex items-center">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5c6bc0] to-[#3f51b5] flex items-center justify-center shadow-md mr-3">
          <FaUser className="text-white" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Candidate Profile
        </h2>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3 flex items-center">
            <FaUserTie className="mr-2 text-primary-600" />
            Candidate Profile
          </h2>

          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
                <FaTools className="mr-2 text-primary-500" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm border border-primary-200 hover:bg-primary-100 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {experience && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
                <FaUserTie className="mr-2 text-primary-500" />
                Experience
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
                {experience}
              </div>
            </div>
          )}

          {education && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
                <FaGraduationCap className="mr-2 text-primary-500" />
                Education
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
                {education}
              </div>
            </div>
          )}

          {otherQualifications && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center text-gray-700">
                <FaMedal className="mr-2 text-primary-500" />
                Other Qualifications
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700">
                {otherQualifications}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
