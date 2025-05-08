"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { CandidateInfo } from "@/types"
import { Upload, Loader2 } from "lucide-react"

interface OnboardingFormProps {
  onComplete: (candidateInfo: CandidateInfo) => void
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [step, setStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{
    success: boolean
    message: string
    candidateInfo?: CandidateInfo
  } | null>(null)

  const [formData, setFormData] = useState<Partial<CandidateInfo>>({
    name: "",
    currentRole: "",
    experience: "",
    location: "",
    education: "",
    skills: [],
    availability: "",
    salaryExpectations: "",
    confidence: {},
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      confidence: {
        ...prev.confidence,
        [name]: 0.9, // High confidence for directly provided information
      },
    }))
  }

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const skillsArray = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    setFormData((prev) => ({
      ...prev,
      skills: skillsArray,
      confidence: {
        ...prev.confidence,
        skills: 0.9,
      },
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadResult(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadResult({
          success: true,
          message: "Resume parsed successfully!",
          candidateInfo: result.candidateInfo,
        })

        // Pre-fill the form with extracted data
        setFormData((prev) => ({
          ...prev,
          ...result.candidateInfo,
          // Merge confidence values
          confidence: {
            ...prev.confidence,
            ...result.candidateInfo.confidence,
          },
        }))
      } else {
        setUploadResult({
          success: false,
          message: result.error || "Failed to parse resume",
        })
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: "An error occurred while processing the file",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    // Complete onboarding with collected data
    onComplete({
      ...(formData as CandidateInfo),
      confidence: formData.confidence || {},
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Welcome to TechInnovate Solutions</CardTitle>
        <CardDescription>
          {step === 1
            ? "Let's start by getting to know you. You can upload your resume or fill in the details manually."
            : "Just a few more details to help us understand your background better."}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">Upload your resume (PDF or DOCX)</span>
                  <span className="text-xs text-muted-foreground">Drag and drop or click to browse</span>
                </Label>
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </div>

              {isUploading && (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing your resume...</span>
                </div>
              )}

              {uploadResult && (
                <div
                  className={`p-3 rounded-md text-sm ${uploadResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {uploadResult.message}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input
                      id="currentRole"
                      name="currentRole"
                      value={formData.currentRole || ""}
                      onChange={handleInputChange}
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      value={formData.experience || ""}
                      onChange={handleInputChange}
                      placeholder="5+ years"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location || ""}
                      onChange={handleInputChange}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleInputChange}
                  placeholder="BS in Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Technical Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  name="skills"
                  value={formData.skills?.join(", ") || ""}
                  onChange={handleSkillsChange}
                  placeholder="JavaScript, React, Node.js, TypeScript"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    name="availability"
                    value={formData.availability || ""}
                    onChange={handleInputChange}
                    placeholder="2 weeks notice"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryExpectations">Salary Expectations</Label>
                  <Input
                    id="salaryExpectations"
                    name="salaryExpectations"
                    value={formData.salaryExpectations || ""}
                    onChange={handleInputChange}
                    placeholder="$120,000 - $150,000"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button type="submit">{step === 1 ? "Next" : "Start Chat"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
