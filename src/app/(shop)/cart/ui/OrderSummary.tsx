"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const OrderSummary = () => {
  const [orderSummaryLoaded, setOrderSummaryLoaded] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const getOrderSummary = useCartStore((state) => state.getOrderSummary);
  const { subTotal, tax, total, totalItems } = getOrderSummary();

  useEffect(() => {
    setOrderSummaryLoaded(true);
  }, [cart]);

  if (!orderSummaryLoaded) {
    return <div className="w-full h-30 bg-gray-200 animate-pulse" />;
  }

  return (
    <div className="grid grid-cols-2">
      <span>Cantidad</span>
      <span className="text-right">{totalItems === 1 ? "1 Producto" : `${totalItems} Productos`}</span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>
      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span className="text-2xl mt-5">Total</span>
      <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
    </div>
  );
};
