import React, { FC } from "react";
import Select from "react-select";

interface IselextProps {
  options: { value: number; label: string }[];
  onChange: (val: number) => void;
}

export const Selext: FC<IselextProps> = ({ options, onChange }) => (
  <Select
    options={options}
    onChange={(val) => {
      if (val?.value) onChange(val.value);
      else {
        console.error("Selected value is empty.");
      }
    }}
  />
);
