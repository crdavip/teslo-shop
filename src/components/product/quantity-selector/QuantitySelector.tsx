"use client";

import clsx from "clsx";
import { IoAdd, IoRemove } from "react-icons/io5";

interface Props {
  quantity: number;

  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1 || quantity + value > 10) return;
    onQuantityChange(quantity + value);
  };
  return (
    <div className="flex mb-2 mt-2">
      <button onClick={() => onValueChange(-1)}>
        <IoRemove
          size={20}
          className={clsx({ "text-gray-300 cursor-auto": quantity == 1, "text-gray-600 hover:text-blue-400": quantity != 1 })}
        />
      </button>
      <span className="w-15 mx-3 flex items-center justify-center bg-gray-200 border-gray-300 text-gray-600 border-2 rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChange(1)}>
        <IoAdd
          size={20}
          className={clsx({ "text-gray-300 cursor-auto": quantity == 10, "text-gray-600 hover:text-blue-400": quantity != 10 })}
        />
      </button>
    </div>
  );
};
