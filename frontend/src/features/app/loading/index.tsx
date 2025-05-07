import { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="flex justify-center gap-3">
      <div className="loader bg-blue-700"></div>
      <div className="">Loading...</div>
    </div>
  );
};
