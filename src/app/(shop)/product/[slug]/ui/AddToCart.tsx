"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";
import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSize | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityStatus, setQuantityStatus] = useState(false);

  const addToCart = () => {
    setQuantityStatus(true);
    if (!size) return null;
    console.log({ size, quantity });
  };
  return (
    <>
      <h3 className="font-bold text-sm">Tallas</h3>
      {quantityStatus && !size && (
        <span className="flex items-center gap-1 mt-2 text-red-400 fade-in">
          <IoWarningOutline /> Debe seleccionar una talla.
        </span>
      )}
      <SizeSelector selectedSize={size} sizes={product.sizes} onSizeChange={setSize} />
      <h3 className="font-bold text-sm">Cantidad</h3>
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
