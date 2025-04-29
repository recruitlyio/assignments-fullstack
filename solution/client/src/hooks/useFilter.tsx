import { FilterProps, Questions } from "@/types";
import { useEffect, useState } from "react";

export const useFilter = ({ skill, difficulty, questions }: FilterProps) => {
  const [filteredResults, setFilteredResults] = useState<Questions[]>([]);

  useEffect(() => {
    if (!skill && !difficulty) {
      setFilteredResults(questions);
      return;
    } else if (!skill && difficulty) {
      const temp = questions.filter((x) => x.difficulty === difficulty);
      setFilteredResults(temp);
      return;
    } else if (skill && !difficulty) {
      const temp = questions.filter((x) => x.skills.includes(skill));
      setFilteredResults(temp);
      return;
    }

    const temp = questions.filter(
      (x) => x.difficulty === difficulty && x.skills.includes(skill)
    );

    setFilteredResults(temp);
  }, [skill, difficulty, questions]);

  return { filteredResults };
};
