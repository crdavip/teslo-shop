"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { placeOrder } from "@/actions";
import { IoWarningOutline } from "react-icons/io5";

export const OrderSummary = () => {
  const [orderSummaryLoaded, setOrderSummaryLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const getOrderSummary = useCartStore((state) => state.getOrderSummary);
  const orderSummary = getOrderSummary();
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    setOrderSummaryLoaded(true);
  }, [cart]);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const res = await placeOrder(productsToOrder, address);
    if (!res.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(res.message);
      return;
    }

    clearCart();
    router.replace(`/orders/${res.order}`);
  };

  if (!orderSummaryLoaded) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
        <div className="w-full h-30 bg-gray-200 animate-pulse" />
        <div className="w-full h-0.5 rounded bg-gray-200 my-5" />
        <h2 className="text-2xl mb-2 font-bold">Resumen de pedido</h2>
        <div className="w-full h-60 bg-gray-200 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div>
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      <div className="w-full h-0.5 rounded bg-gray-200 my-5" />

      <h2 className="text-2xl mb-2 font-bold">Resumen de pedido</h2>
      <div className="grid grid-cols-2">
        <span>Cantidad</span>
        <span className="text-right">
          {orderSummary.totalItems === 1 ? "1 Producto" : `${orderSummary.totalItems} Productos`}
        </span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(orderSummary.subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(orderSummary.tax)}</span>
        <span className="text-2xl mt-5">Total</span>
        <span className="text-2xl mt-5 text-right">{currencyFormat(orderSummary.total)}</span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <p className="mb-3">
          <span className="text-xs/tight">
            Al hacer clic en el siguiente botón, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              {" "}
              política de privacidad.
            </a>
          </span>
        </p>
        {/* href="/orders/123" */}
        <button
          onClick={onPlaceOrder}
          className={clsx("flex justify-center w-full", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          disabled={isPlacingOrder}
        >
          Realizar pedido
        </button>
        {errorMessage && (
          <p className="text-red-400 text-md flex justify-center items-center gap-1 mt-2 fade-in">
            <IoWarningOutline /> {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};
