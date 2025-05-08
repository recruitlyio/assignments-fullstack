import type { CandidateInfo } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CandidateSummaryProps {
  candidateInfo: CandidateInfo
}

export default function CandidateSummary({ candidateInfo }: CandidateSummaryProps) {
  // Helper function to render confidence level
  const renderConfidence = (key: string) => {
    const confidence = candidateInfo.confidence[key] || 0
    return (
      <div className="mt-1">
        <Progress value={confidence * 100} className="h-2" />
        <span className="text-xs text-muted-foreground">Confidence: {Math.round(confidence * 100)}%</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div>
          <h3 className="font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {candidateInfo.name && (
              <div>
                <span className="font-medium">Name:</span> {candidateInfo.name}
                {renderConfidence("name")}
              </div>
            )}

            {candidateInfo.currentRole && (
              <div>
                <span className="font-medium">Current Role:</span> {candidateInfo.currentRole}
                {renderConfidence("currentRole")}
              </div>
            )}

            {candidateInfo.location && (
              <div>
                <span className="font-medium">Location:</span> {candidateInfo.location}
                {renderConfidence("location")}
              </div>
            )}

            {candidateInfo.experience && (
              <div>
                <span className="font-medium">Experience:</span> {candidateInfo.experience}
                {renderConfidence("experience")}
              </div>
            )}

            {candidateInfo.education && (
              <div>
                <span className="font-medium">Education:</span> {candidateInfo.education}
                {renderConfidence("education")}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {candidateInfo.skills && candidateInfo.skills.length > 0 && (
          <div>
            <h3 className="font-medium">Skills</h3>
            {renderConfidence("skills")}
            <div className="flex flex-wrap gap-2 mt-2">
              {candidateInfo.skills.map((skill, index) => (
                <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Information */}
        <div>
          <h3 className="font-medium">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {candidateInfo.availability && (
              <div>
                <span className="font-medium">Availability:</span> {candidateInfo.availability}
                {renderConfidence("availability")}
              </div>
            )}

            {candidateInfo.salaryExpectations && (
              <div>
                <span className="font-medium">Salary Expectations:</span> {candidateInfo.salaryExpectations}
                {renderConfidence("salaryExpectations")}
              </div>
            )}

            {candidateInfo.workStyle && (
              <div>
                <span className="font-medium">Work Style:</span> {candidateInfo.workStyle}
                {renderConfidence("workStyle")}
              </div>
            )}
          </div>
        </div>

        {/* Missing Information */}
        <div>
          <h3 className="font-medium">Missing Information</h3>
          <div className="mt-2 text-muted-foreground">
            {!candidateInfo.name && <div>• Name</div>}
            {!candidateInfo.experience && <div>• Years of experience</div>}
            {!candidateInfo.skills?.length && <div>• Technical skills</div>}
            {!candidateInfo.education && <div>• Education background</div>}
            {!candidateInfo.currentRole && <div>• Current role</div>}
            {!candidateInfo.location && <div>• Location</div>}
            {!candidateInfo.availability && <div>• Availability</div>}
            {!candidateInfo.salaryExpectations && <div>• Salary expectations</div>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
