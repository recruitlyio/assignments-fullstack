import { Skill } from "@/types";
import { Badge } from "@/components/ui";

interface SkillsListProps {
  skills: Skill[];
}

const getSkillLevelColor = (level?: string) => {
  if (!level) return "default";

  switch (level.toLowerCase()) {
    case "expert":
    case "advanced":
      return "primary";
    case "intermediate":
      return "secondary";
    case "beginner":
    case "basic":
      return "info";
    default:
      return "default";
  }
};

const SkillsList = ({ skills }: SkillsListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
        >
          <span className="font-medium text-gray-800">{skill.name}</span>
          {skill.level && (
            <Badge variant={getSkillLevelColor(skill.level) as any} size="sm">
              {skill.level}
            </Badge>
          )}
          {skill.yearsOfExperience !== undefined && (
            <span className="text-xs text-gray-500">
              {skill.yearsOfExperience}{" "}
              {skill.yearsOfExperience === 1 ? "year" : "years"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
