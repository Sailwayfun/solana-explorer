"use client";
import { FC, ChangeEvent } from "react";
import { Input } from "../../components/ui/input";

/**
 * SearchInput is a controlled input for filtering blocks.
 * @param value The current search value
 * @param onChange Callback when the value changes
 */
export type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <Input
      placeholder="Search transactions, blocks, programs and tokens"
      className="max-w-md"
      value={value}
      onChange={handleChange}
      aria-label="Search blocks"
    />
  );
};
