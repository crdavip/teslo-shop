"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
        <div className="animate-pulse w-full pb-6">
            <div className="h-12 bg-gray-200 rounded-md" />  
            <div className="h-12 bg-gray-200 rounded-md mt-4" />
        </div>
    )
  }

  return <PayPalButtons />;
};
