import { FC } from "react";

interface IFormLabelProps {
  text: string;
  htmlFor?: string;
}

export const FormLabel: FC<IFormLabelProps> = ({ text, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-lg block text-gray-700  font-bold mb-2"
    >
      {text}
    </label>
  );
};
