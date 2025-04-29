import { FilterProps, Questions } from "@/types";
import { useEffect, useState } from "react";

export const useFilter = ({ skill, difficulty, questions }: FilterProps) => {
  const [filteredResults, setFilteredResults] = useState<Questions[]>([]);

  useEffect(() => {
    const temp = questions.filter(
      (x) => x.difficulty === difficulty && x.skills.includes(skill)
    );

    setFilteredResults(temp);
  }, [skill, difficulty, questions]);

  return { filteredResults };
};
