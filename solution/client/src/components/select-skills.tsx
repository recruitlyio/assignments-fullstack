import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectSkills = ({
  skills,
  setSkill,
}: {
  skills: string[];
  setSkill: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        setSkill(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter with skills" />
      </SelectTrigger>
      <SelectContent>
        {skills.map((skill) => (
          <SelectItem key={skill} value={skill}>
            {skill}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
