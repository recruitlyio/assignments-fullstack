import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterDifficulty } from "@/types";

export const SelectDifficulty = ({
  setDifficulty,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<FilterDifficulty>>;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        setDifficulty(value as FilterDifficulty);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter with difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"easy"}>Easy</SelectItem>
        <SelectItem value={"medium"}>Medium</SelectItem>
        <SelectItem value={"hard"}>Hard</SelectItem>
      </SelectContent>
    </Select>
  );
};
