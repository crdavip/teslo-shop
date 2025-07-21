"use client";

import clsx from "clsx";
import { useState } from "react";
import { IoAdd, IoRemove } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);
  const onQuantityChange = (value: number) => {
    if (count + value < 1 || count + value > 5) return;
    setCount(count + value);
  };
  return (
    <div className="flex mb-2 mt-2">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemove
          size={20}
          className={clsx({ "text-gray-300 cursor-auto": count == 1, "text-gray-600 hover:text-blue-400": count != 1 })}
        />
      </button>
      <span className="w-15 mx-3 flex items-center justify-center bg-gray-200 border-gray-300 text-gray-600 border-2 rounded">
        {count}
      </span>
      <button onClick={() => onQuantityChange(1)}>
        <IoAdd size={20} className={clsx({ "text-gray-300 cursor-auto": count == 5, "text-gray-600 hover:text-blue-400": count != 5 })} />
      </button>
    </div>
  );
};
