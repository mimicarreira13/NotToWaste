import React from "react";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
};

export default function Contador({ value, onChange, min = 0 }: Props) {
  function increment() {
    onChange(value + 1);
  }

  function decrement() {
    if (value > min) onChange(value - 1);
  }

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={decrement}
        className="w-8 h-8 bg-[#6E4343] text-white rounded-lg"
      >
        -
      </button>
      <div className="w-10 h-8 bg-white text-black rounded-lg flex items-center justify-center">
        {value}
      </div>
      <button
        onClick={increment}
        className="w-8 h-8 bg-[#4C6E43] text-white rounded-lg"
      >
        +
      </button>
    </div>
  );
}
