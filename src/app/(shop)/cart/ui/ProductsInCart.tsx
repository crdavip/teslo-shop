"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";
import { useCartStore } from "@/store";
import { QuantitySelector } from "@/components";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [productLoaded, setProductLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  useEffect(() => {
    setProductLoaded(true);
  }, []);

  if (!productLoaded) {
    return <div className="w-full h-36 bg-gray-200 animate-pulse" />;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            className="mr-5 rounded h-[100px]"
            width={100}
            height={100}
            priority
          />
          <div>
            <Link className="hover:text-blue-400 cursor-pointer" href={`/product/${product.slug}`}>
              <p className="font-bold">
                {product.title} - Talla {product.size}
              </p>
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) => updateProductQuantity(product, quantity)}
            />
            <button
              onClick={() => removeProduct(product)}
              className="flex justify-center items-center gap-2 mt-3 underline hover:text-blue-400"
            >
              <IoTrashOutline />
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
