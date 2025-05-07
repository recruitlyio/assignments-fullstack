import { FC } from "react";

interface IViewCandidateProps {
  name: string;
  experience: string;
}

export const ViewCandidateDetails: FC<IViewCandidateProps> = ({
  experience,
  name,
}) => {
  return (
    <div className="flex justify-items-start gap-20 font-bold text-3xl">
      <div>Name: {name}</div>
      <div>Experience: {experience}</div>
    </div>
  );
};
