import { ValidSize } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize: ValidSize;
  sizes: ValidSize[];
}

export const SizeSelector = ({ sizes, selectedSize }: Props) => {
  return (
    <div className="mb-5">
      <div className="flex">
        {sizes.map((size) => (
          <button
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
