"use client"
import { ParsedResumeData } from "@/lib/ai/resumeparser";
import { AlertTriangle, Briefcase, Download, GraduationCap, Lightbulb, User } from "lucide-react";
import SectionCard from "./SectionCard";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ResumeDisplayProps {
    data: ParsedResumeData
    onBack: () => void
}

const ResumeDisplay = ({ data, onBack }: ResumeDisplayProps) => {

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${data.personalInfo?.name || "resume"}.json`
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="flex gap-2 justify-between">
                <Button className="cursor-pointer" onClick={onBack}>Back</Button>
                <Button className="cursor-pointer" onClick={handleDownload}>
                    <Download />
                    Download JSON
                </Button>
            </div>
            {data.error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{data.error}</AlertDescription>
                </Alert>
            )}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-1 lg:grid-cols-3">
                <SectionCard title="Personal Information" icon={<User className="h-4 w-4" />}>
                    <div className="space-y-2">
                        {data.personalInfo?.name && (
                            <p>
                                <strong>Name:</strong> {data.personalInfo.name}
                            </p>
                        )}
                        {data.personalInfo?.email && (
                            <p>
                                <strong>Email:</strong> {data.personalInfo.email}
                            </p>
                        )}
                        {data.personalInfo?.phone && (
                            <p>
                                <strong>Phone:</strong> {data.personalInfo.phone}
                            </p>
                        )}
                        {data.personalInfo?.location && (
                            <p>
                                <strong>Location:</strong> {data.personalInfo.location}
                            </p>
                        )}
                        <div className="flex gap-2">
                            {data.personalInfo?.linkedIn && (
                                <a href={data.personalInfo.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    LinkedIn
                                </a>
                            )}
                            {data.personalInfo?.github && (
                                <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    GitHub
                                </a>
                            )}
                            {data.personalInfo?.website && (
                                <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Website
                                </a>
                            )}
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="Education" icon={<GraduationCap className="h-4 w-4" />} className="lg:col-span-2">
                    {data.education && data.education.length > 0 ? (
                        <ul className="space-y-3">
                            {data.education.map((edu, index: number) => (
                                <li key={index} className="p-3 rounded-md border border-border bg-background/50">
                                    <h4 className="font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-t-md -mx-3 -mt-3 mb-2">{edu.degree}</h4>
                                    {edu.institution && <p className="text-sm text-muted-foreground">{edu.institution}</p>}
                                    {edu.duration && <p className="text-sm text-muted-foreground">Duration: {edu.duration}</p>}
                                    {edu.location && <p className="text-sm text-muted-foreground">Location: {edu.location}</p>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No education information extracted.</p>
                    )}
                </SectionCard>

                <SectionCard title="Skills" icon={<Lightbulb className="h-4 w-4" />} className="lg:col-span-1 h-fit">
                    {data.skills && data.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2 max-h-[500px] overflow-auto">
                            {data.skills.map((skill, index: number) => (
                                <Badge key={index} className="text-sm px-3 py-1 bg-black text-white">
                                    {skill.name}
                                    {skill.proficiency && ` (${skill.proficiency})`}
                                </Badge>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No skills information extracted.</p>
                    )}
                </SectionCard>

                <SectionCard title="Work Experience" icon={<Briefcase className="h-4 w-4" />} className="lg:col-span-2">
                    {data.experience && data.experience.length > 0 ? (
                        <ul className="space-y-4">
                            {data.experience.map((exp, index: number) => (
                                <li key={index} className="p-3 rounded-md border border-border bg-background/50">
                                    <h4 className="font-semibold text-primary-foreground bg-primary px-2 py-1 rounded-t-md -mx-3 -mt-3 mb-2">{exp.role}</h4>
                                    {exp.company && <p className="text-sm">{exp.company}</p>}
                                    {exp.location && <p className="text-sm text-muted-foreground">Location: {exp.location}</p>}
                                    <p className="text-sm text-muted-foreground">Duration: {exp.duration}</p>
                                    {exp.description && <p className="mt-1 text-sm">{exp.description}</p>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground">No work experience information extracted.</p>
                    )}
                </SectionCard>
            </div>
        </>
    )
}

export default ResumeDisplay