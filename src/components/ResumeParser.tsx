"use client"
import { parseResume } from "@/app/actions";
import { ParsedResumeData } from "@/lib/ai/resumeparser";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import ResumeDisplay from "./ResumeDisplay";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";

const ResumeParser = () => {
    const [resumeText, setResumeText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [parsedResumeData, setParsedResumeData] = useState<ParsedResumeData | null>(null);
    const [error, setError] = useState<string | null>("");

    const handleParseResume = async () => {
        try {
            setError(null)
            setIsLoading(true);
            setParsedResumeData(null);
            const data = await parseResume(resumeText);
            setParsedResumeData(data);
        } catch (error: unknown) {
            setError((error as Error).message)
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setParsedResumeData(null);
    }

    if (parsedResumeData) {
        return (<ResumeDisplay data={parsedResumeData} onBack={handleBack} />)
    }

    return (
        <>
            <Card className="p-6">
                <Textarea
                    placeholder="Paste your resume text here..."
                    className="min-h-[300px] mb-4 overflow-y-scroll max-h-[300px] resize-none"
                    value={resumeText}
                    rows={15}
                    onChange={(e) => setResumeText(e.target.value)}
                    disabled={isLoading}
                />
                <Button onClick={handleParseResume} disabled={isLoading || !resumeText.trim()} className="w-full cursor-pointer">
                    {
                        isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span> Analyzing Resume...</span>
                            </>
                        ) : (<span>Submit</span>)
                    }
                </Button>
            </Card>
            {error && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}


        </>
    )
}

export default ResumeParser