import Header from "./header";
import EducationComponent from "./education";
import SkillsComponent from "./skills";
import ExperienceComponent from "./experience";
import { ParsedResume } from "@/types";

interface Props {
  resume: ParsedResume;
}

export default function ParsedResumeDisplay({ resume }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-4 my-8">
      <Header />
      <SkillsComponent skills={resume.skills}/>
      <ExperienceComponent workExperience={resume.workExperience} />
      <EducationComponent education={resume.education} />
    </div>
  );
}