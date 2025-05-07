import ResumeParser from "@/components/ResumeParser"

const Homepage = () => {
  return (
    <div className="space-y-8 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          CVX - Intelligent Resume Parser
        </h2>
      </div>
      <ResumeParser />
    </div>
  )
}

export default Homepage