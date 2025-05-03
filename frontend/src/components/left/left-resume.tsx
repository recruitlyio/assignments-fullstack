"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn/ui or similar
import RadialChart from "@/components/radial-chart"; // Adjust the import path as necessary
import jsPDF from "jspdf";
import JsonFormatter from "react-json-formatter";
import autoTable from "jspdf-autotable";
const LeftResume = () => {
  const [resumeContent, setResumeContent] = useState<string>(`Abhay Dixit
Full Stack Developer
Hardoi, India +91 9363791662 adixit7386@gmail.com Portfolio/Blog
adixit7386
adixit7386
Experience
Full Stack Developer (Contract) | Docshare Jan 2025 - Present | Remote
Developed a fully functional MVP for a document-sharing and selling platform using Markdown.
Leveraged React.js, Node.js, MongoDB, MySQL, Redis, RabbitMQ, Razorpay, Google Analytics, and Meta Pixel.
Implemented CI/CD pipeline with GitHub, AWS CodeBuild, CodeDeploy, CodePipeline, and S3.
Automated note generation from PDFs using Gemini, significantly enhancing efficiency.
Devops Engineer | Barclays Jul 2024 - Dec 2024 | Chennai
Worked on Ab Initio releases for OAT and PROD environments, ensuring smooth deployment and stability.
Created Tivoli Workload Scheduler (TWS) definitions, performed sandbox migrations, and rollback testing.
Migrated the Change Governance Dashboard from Django MVT to React.js, UI-backend separation.
Devops Engineer - Intern | Barclays Jun 2023 - Aug 2023 | Chennai
Developed a Dashboard to measure, monitor, and address SLA breaches in Change Requests.
Developed automated email warning using Python scripting and integration with the Nylas API.
Enabled real-time tracking and governance of Change Requests to ensure SLA compliance.
Projects
Blog Automation
Implemented automated blog and image generation using Gemini AI and Flux, processing with CloudFront.
Built using Next.js for performance, deployed with caching mechanisms to optimize load times and scalability.
Dynamically generated metadata, descriptions and structured data to enhance SEO visibility and ranking.
CI/CD Project
Implemented CI/CD using Jenkins for code integration, security checks (OWASP, SonarQube), and Docker builds.
Configured Jenkins to update Docker images, and deploy applications on Kubernetes via Argo CD.
Integrated Grafana and Prometheus for monitoring, with automated email notifications for deployment updates.
NexgenAI
Developed an AI-driven digital sales worker to automate email marketing, including lead fetching.
Integrated LLM and Nylas APIs to generate, send, and track personalized emails tailored to potential leads.
Implemented automatic email tracking, analysis, and smart reply functionality to enhance follow-up efficiency.
Skills
Frontend Development
NextJS, ReactJS, CSS, HTML, Bootstrap, TailwindCSS, ShadCN,
MaterialUI, MantineUI
Backend Development
NodeJS, ExpressJS, Django, MongoDB, PostgreSQL, MySQL,
Nginx, Redis, RabbitMQ
Devops and Cloud
Linux, Git, Vagrant, Terraform, Docker, Kubernetes, GitOps,
Jenkins, AWS, Vercel
Languages
C, Cpp, Python, Javascript, Typescript
Education
SRMIST, Chennai
B. Tech AI | Full Financial Aid
9.0 GPA
Sep 2020 - May 2024 Vidyagyan School, Sitapur
12 | Full Financial Aid
97.2%
Apr 2019 - Mar 2020
Vidyagyan School, Sitapur
10 | Full Financial Aid
95.4%
`);
  const [jobDescription, setJobDescription] =
    useState<string>(`Full-stack AI Developer (ReactJS/NodeJS)
₹12L – ₹24L • No equity
About the job
We are seeking a skilled Full-stack AI Developer to join our team building next-generation AI agents and intelligent systems.

You will be working with cutting-edge AI technologies while leveraging your expertise in modern JavaScript frameworks.

What You Will Be Working On

Designing and developing AI agents that can autonomously perform complex tasks and interact with users
Building responsive, intuitive front end interfaces in ReactJS that showcase AI capabilities
Implementing robust backend systems with NodeJS, TypeScript, and Fastify/Express to power AI functionalities
Creating and optimizing API integrations with various AI/ML models and services
Developing conversational interfaces and natural language processing components
Engineering decision systems and autonomous logic flows for intelligent agents
Working on real time data processing systems to support AI agent operations
Implementing and testing machine learning model integrations
Optimizing AI agent performance across the entire stack
Required Experience and Skills

Minimum 4+ years of professional experience in full stack JavaScript development
Strong proficiency with ReactJS, including state management, hooks, and component architecture
Solid backend development skills with NodeJS, TypeScript, and Fastify or Express
Experience integrating with third party APIs and services
Understanding of AI concepts and experience working with Claude, OpenAI, DeepSeek and Google LLMs
Strong JavaScript/TypeScript skills and understanding of modern ES6+ features`);
  const [analysisResult, setAnalysisResult] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [json, setJson] = useState({});
  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(
        `https://fullstack-project-backend.vercel.app/api/resume-analyzer/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "test", // Use a public env var for frontend
          },
          body: JSON.stringify({
            resume: resumeContent,
            jobDescription: jobDescription,
          }),
        }
      );

      const data = await response.json();

      setAnalysisResult(data.analysis);
      setJson(data.data);
    } catch (error) {
      console.error("Analysis error:", error);
      //   setAnalysisResult("An error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Report", 14, 22);

    autoTable(doc, {
      head: [["Title", "Description", "Score"]],
      body: analysisResult.map((item) => [
        item.title,
        item.description,
        item.score.toString(),
      ]),
      startY: 30,
    });

    doc.save("report.pdf");
  };
  const downloadJSON = (data: object, filename = "data.json") => {
    const jsonStr = JSON.stringify(data, null, 2); // Pretty print JSON
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url); // Clean up
  };
  const jsonStyle = {
    propertyStyle: { color: "#2A9D90" },
    stringStyle: { color: "grey" },
    numberStyle: { color: "darkorange" },
  };
  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto space-y-6">
      <div>
        <Tabs defaultValue="resume" className="w-full">
          <TabsList className="w-full flex">
            <TabsTrigger value="resume" className="flex-1">
              Paste Resume
            </TabsTrigger>
            <TabsTrigger value="job" className="flex-1">
              Paste Job Description
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume">
            <Textarea
              placeholder="Paste your resume content here..."
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              rows={10}
              className="w-full border border-border rounded-md p-4 bg-background text-foreground"
            />
          </TabsContent>

          <TabsContent value="job">
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={10}
              className="w-full border border-border rounded-md p-4 bg-background text-foreground"
            />
          </TabsContent>
        </Tabs>

        {/* Analyze Button */}
        <div className="flex py-3 justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="bg-primary cursor-pointer rounded-md py-2 px-6 hover:bg-primary-dark disabled:opacity-50"
          >
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>

        {/* Analysis Result */}
        <div className="w-full p-4 border border-border rounded-md mt-4 bg-background">
          <div className="flex">
            <h3 className="text-lg font-semibold px-4 py-4 mb-2 text-foreground">
              Analysis Result
            </h3>
            {analysisResult && analysisResult.length > 0 && (
              <Button onClick={generatePDF} className="cursor-pointer ml-auto">
                Download
              </Button>
            )}
          </div>
          <div className="flex justify-evenly flex-wrap gap-4">
            {isLoading ? (
              <Skeleton className="h-20 w-full rounded-md" />
            ) : (
              analysisResult &&
              analysisResult.map(
                (
                  item: { title: string; description: string; score: number },
                  index
                ) => <RadialChart key={index} data={item} />
              )
            )}
          </div>
        </div>
        <div className="w-full p-4 border border-border rounded-md mt-4 bg-background">
          <div className="flex">
            <h3 className="text-lg font-semibold px-4 py-4 mb-2 text-foreground">
              Parsed Data
            </h3>
            {analysisResult && analysisResult.length > 0 && (
              <Button
                onClick={() => downloadJSON(json, "projectData.json")}
                className="cursor-pointer ml-auto"
              >
                Download
              </Button>
            )}
          </div>
          <div className="flex justify-evenly flex-wrap gap-4">
            {isLoading ? (
              <Skeleton className="h-20 w-full rounded-md" />
            ) : (
              analysisResult &&
              analysisResult.length > 0 && (
                <JsonFormatter json={json} tabWith={4} jsonStyle={jsonStyle} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftResume;
