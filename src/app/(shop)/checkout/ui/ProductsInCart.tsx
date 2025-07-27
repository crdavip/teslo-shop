"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const ProductsInCart = () => {
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
            <p className="font-bold">
              {product.title} - Talla {product.size}
            </p>
            <p>{currencyFormat(product.price)} x {product.quantity}</p>
            <p className="font-bold">Subtotal: {currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
