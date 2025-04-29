import React from 'react';
import {CandidateProfile} from '../types/chat';


const CandidateSummary = ({profile}: { profile: CandidateProfile }) => {
  const isEmpty = Object.keys(profile).length === 0;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Candidate Summary</h2>

      {isEmpty ? (
        <p className="text-gray-500">No candidate information extracted yet.</p>
      ) : (
        <div className="space-y-2">
          {profile.name && (
            <p><strong>Name:</strong> {profile.name}</p>
          )}
          {profile.email && (
            <p><strong>Email:</strong> {profile.email}</p>
          )}
          {profile.yearsOfExperience && (
            <p><strong>Years of Experience:</strong> {profile.yearsOfExperience}</p>
          )}
          {profile.education && (
            <p><strong>Education:</strong> {profile.education}</p>
          )}
          {profile.skills && profile.skills.length > 0 && (
            <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateSummary;