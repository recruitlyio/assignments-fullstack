import { useState } from "react";
import { CandidateProfile } from "@/types";
import { Card } from "@/components/ui";
import {
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiAward,
} from "react-icons/fi";
import SkillsList from "./SkillsList";

interface ProfileSummaryProps {
  profile: CandidateProfile;
  className?: string;
}

const ProfileSummary = ({ profile, className }: ProfileSummaryProps) => {
  const [expandedSections, setExpandedSections] = useState({
    skills: true,
    experience: true,
    education: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Card
      className={`p-6 flex flex-col gap-6 bg-white animate-slideUp ${className}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Candidate Profile</h2>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 mb-1">Profile Confidence</span>
          <div
            className={`text-lg font-bold ${
              profile.confidenceScore >= 80
                ? "text-green-600"
                : profile.confidenceScore >= 50
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {profile.confidenceScore}%
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="flex flex-col gap-3">
        {profile.name && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiUser className="text-primary-600 min-w-5" />
            <span className="font-medium">{profile.name}</span>
          </div>
        )}

        {profile.email && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiMail className="text-primary-600 min-w-5" />
            <span className="font-medium">{profile.email}</span>
          </div>
        )}

        {profile.phone && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiPhone className="text-primary-600 min-w-5" />
            <span className="font-medium">{profile.phone}</span>
          </div>
        )}

        {profile.location && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiMapPin className="text-primary-600 min-w-5" />
            <span className="font-medium">{profile.location}</span>
          </div>
        )}

        {profile.availableFrom && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiCalendar className="text-primary-600 min-w-5" />
            <span>
              <span className="text-gray-500 mr-1">Available from:</span>
              <span className="font-medium">{profile.availableFrom}</span>
            </span>
          </div>
        )}

        {profile.salaryExpectation && (
          <div className="flex items-center gap-2 text-gray-800">
            <FiBriefcase className="text-primary-600 min-w-5" />
            <span>
              <span className="text-gray-500 mr-1">Expected salary:</span>
              <span className="font-medium">{profile.salaryExpectation}</span>
            </span>
          </div>
        )}
      </div>

      {/* Summary */}
      {profile.summary && (
        <div className="border-b border-gray-200 pb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
        </div>
      )}

      {/* Skills */}
      <div>
        <h3
          className="font-semibold text-lg text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("skills")}
        >
          <div className="flex items-center gap-2">
            <FiAward className="text-primary-600" />
            <span>Skills</span>
          </div>
          {expandedSections.skills ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </h3>

        {expandedSections.skills && (
          <div className="animate-fadeIn">
            {profile.skills.length > 0 ? (
              <SkillsList skills={profile.skills} />
            ) : (
              <p className="text-gray-500 italic">No skills extracted yet.</p>
            )}
          </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <h3
          className="font-semibold text-lg text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("experience")}
        >
          <div className="flex items-center gap-2">
            <FiBriefcase className="text-primary-600" />
            <span>Experience</span>
          </div>
          {expandedSections.experience ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </h3>

        {expandedSections.experience && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {profile.experience.length > 0 ? (
              profile.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <div>
                      {exp.title && (
                        <div className="text-primary-600 font-medium">
                          {exp.title}
                        </div>
                      )}
                      {exp.company && (
                        <h4 className="font-semibold text-gray-900">
                          {exp.company}
                        </h4>
                      )}
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <div className="text-sm text-gray-500">
                        {exp.startDate || "N/A"} -{" "}
                        {exp.isCurrentRole ? "Present" : exp.endDate || "N/A"}
                      </div>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No experience extracted yet.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Education */}
      <div>
        <h3
          className="font-semibold text-lg text-gray-900 mb-3 flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection("education")}
        >
          <div className="flex items-center gap-2">
            <FiCalendar className="text-primary-600" />
            <span>Education</span>
          </div>
          {expandedSections.education ? (
            <FiChevronUp className="text-gray-500" />
          ) : (
            <FiChevronDown className="text-gray-500" />
          )}
        </h3>

        {expandedSections.education && (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {profile.education.length > 0 ? (
              profile.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  {edu.institution && (
                    <h4 className="font-semibold text-gray-900">
                      {edu.institution}
                    </h4>
                  )}
                  {edu.degree && (
                    <div className="text-gray-700">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </div>
                  )}
                  {edu.graduationYear && (
                    <div className="text-sm text-gray-500 mt-1">
                      Graduated: {edu.graduationYear}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No education extracted yet.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 text-right">
        Last updated: {new Date(profile.lastUpdated).toLocaleString()}
      </div>
    </Card>
  );
};

export default ProfileSummary;
