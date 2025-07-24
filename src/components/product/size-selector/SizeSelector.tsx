import { ValidSize } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ValidSize;
  sizes: ValidSize[];

  onSizeChange: (size: ValidSize) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSizeChange }: Props) => {
  return (
    <div className="mb-5">
      <div className="flex">
        {sizes.map((size) => (
          <button
            className={clsx("mx-2 hover:underline text-lg", {
              "underline text-blue-400": size === selectedSize,
              "text-gray-400 hover:text-blue-400": size !== selectedSize
            })}
            onClick={() => onSizeChange(size)}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
