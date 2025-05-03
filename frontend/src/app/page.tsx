// import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Metadata } from "next";
import ResumeAnalyzer from "../components/resume-analyzer";

export const metadata: Metadata = {
  title: "Resume Analyzer | Analyze & Optimize Your Resume",
  description:
    "Resume Analyzer is a powerful tool that helps job seekers analyze and improve their resumes. Get insights, keyword suggestions, and tips to make your resume stand out to recruiters and ATS (Applicant Tracking Systems).",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="h-16 flex items-center justify-between px-6 shadow-sm border-b">
        <h1 className="text-xl font-semibold">Resume Analyzer</h1>
        <ModeToggle />
      </nav>

      {/* Functionality Placeholder */}
      <section className="flex-1 overflow-y-auto px-6 py-4">
        <ResumeAnalyzer />
      </section>
    </main>
  );
}
