import ResumeAnalyzer from "@/components/resume-analyzer";

export default function Home() {
  return (
    <div className="h-screen max-w-[90%] p-12 m-auto">
      <h1 className="text-4xl font-bold mb-8">Resume Parser</h1>
      <ResumeAnalyzer />
    </div>
  );
}

