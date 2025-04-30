"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResumeResponse() {
  const [data, setData] = useState<{
    name: string;
    skills: string[];
    email: string;
    phone: string;

    workExperience: {
      company: string;
      title: string;
      start_date: string;
      end_date: string;
      description: string;
    }[];
    education: {
      school: string;
      degree: string;
      start_date: string;
      end_date: string;
    }[];
    suggestions: string[];
  }>();
  const router = useRouter();

  useEffect(() => {
    const localData = localStorage.getItem("parsedResume");
    if (!localData) return;
    setData(JSON.parse(localData));
  }, []);

  if (!data)
    return (
      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">No Resume Found</h1>
      </div>
    );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex gap-1.5">
        <Button className="cursor-pointer" onClick={() => router.back()}>
          ←
        </Button>
        <h1 className="text-3xl font-bold">{data.name}</h1>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          📧 {data.email} | 📞 {data.phone}
        </p>

        {data.suggestions?.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="text-sm cursor-pointer bg-red-200"
              >
                💡 Suggestions
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Resume Suggestions</DialogTitle>
              </DialogHeader>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                {data.suggestions.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          <div className="space-y-4">
            {data.workExperience.map((exp, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-medium">
                  {exp.title} @ {exp.company}
                </h3>
                <p className="text-sm text-gray-500">
                  {exp.start_date} - {exp.end_date}
                </p>
                <p className="text-sm mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          {data.education.map((edu, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-medium">{edu.school}</h3>
              <p className="text-sm text-gray-500">{edu.degree}</p>
              <p className="text-sm">
                {edu.start_date} - {edu.end_date}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
