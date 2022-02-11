import { useState } from "react";

interface InputProps {
  increment: () => void;
  decrease: () => void;
  value: number;
  setField: (value: number) => void;
}

export function useMintInput(INITIAL_VALUE = 0): InputProps {
  const [value, setValue] = useState(INITIAL_VALUE);
  const increment = () => setValue((prev) => prev + 1);
  const decrease = () => setValue((prev) => (prev - 1 < 0 ? 0 : prev - 1));
  const setField = (value) => {
    if (value < 0) {
      setValue(0);
      return;
    }
    setValue(Number(value));
  };

  return {
    value,
    decrease,
    increment,
    setField,
  };
}
