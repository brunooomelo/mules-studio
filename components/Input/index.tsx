import { useState } from "react";

interface InputProps {
  increment: () => void;
  decrease: () => void;
  value: number;
  onChange: (value: number) => void;
}
export function Input({ increment, decrease, value, onChange }: InputProps) {
  return (
    <div className="flex w-48 justify-around">
      <button
        onClick={decrease}
        className="w-12 h-12 bg-gray-400 rounded-full font-bold"
      >
        -
      </button>
      <input
        type="number"
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-20 h-12 rounded-full p-4 text-center font-bold bg-gray-400"
        value={value}
      />
      <button
        onClick={increment}
        className=" w-12 h-12 bg-gray-400 rounded-full font-bold"
      >
        +
      </button>
    </div>
  );
}
