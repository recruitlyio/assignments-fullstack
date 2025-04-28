"use client"
import { MatcherFormSchema } from "@/utils/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type Experience = {
    job_title: string;
    company: string;
    duration: string;
    responsibilities: string[];
  };
  
  type Resume = {
    address: string;
    certifications: string[];
    education: {
      degree: string;
      institution: string;
      year_of_graduation: number;
    };
    email: string;
    experience: Experience[];
    languages: string[];
    phone: string;
    skills: string[];
  };
  
  type BestCandidate = {
    id: string;
    name: string;
    skillScore: number;
    experienceScore: number;
    potentialFitScore: number;
    totalScore: number;
    reason: string;
    resume: Resume[];
  };

export default function useMatcher() {
    const [error, setError] = useState("");
    const [loading, setloading] = useState<boolean>(false);
    const [bestCandidate, setBestCandidate] = useState<BestCandidate | null>(null);

    const matcherForm = useForm<z.infer<typeof MatcherFormSchema>>({
        resolver: zodResolver(MatcherFormSchema),
        defaultValues: {
            role: "",
            description: ""
        }
    });

    const submitMatcherForm = async (values: z.infer<typeof MatcherFormSchema>) => {
        setloading(true);
        setError("");
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND}/api/v1/candidates/get-candidates`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        role: values.role,
                        description: values.description
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
            } else {
                setBestCandidate(data);
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        } finally {
            setloading(false);
        }
    };

    return {
        loading,
        error,
        matcherForm,
        submitMatcherForm,
        bestCandidate 
    };
}
