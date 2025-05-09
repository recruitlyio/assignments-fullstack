"use client"

import { useState } from "react"
import Chat from "@/components/chat"
import OnboardingForm from "@/components/onboarding-form"
import { jobDescription } from "@/lib/job-description"
import type { CandidateInfo } from "@/types"
import { initialCandidateInfo } from "@/lib/extract-info"

export default function Home() {
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>(initialCandidateInfo)

  const handleOnboardingComplete = (info: CandidateInfo) => {
    setCandidateInfo(info)
    setOnboardingComplete(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-3xl font-bold mb-4 text-center">Software Engineer Position</h1>

        {!onboardingComplete ? (
          <OnboardingForm onComplete={handleOnboardingComplete} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <div className="lg:col-span-2">
              <Chat initialCandidateInfo={candidateInfo} />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Role</h3>
                  <p>{jobDescription.role}</p>
                </div>
                <div>
                  <h3 className="font-medium">Company</h3>
                  <p>{jobDescription.company}</p>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{jobDescription.location}</p>
                </div>
                <div>
                  <h3 className="font-medium">Required Skills</h3>
                  <ul className="list-disc pl-5">
                    {jobDescription.requiredSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium">Preferred Qualifications</h3>
                  <ul className="list-disc pl-5">
                    {jobDescription.preferredQualifications.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
