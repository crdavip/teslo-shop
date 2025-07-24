"use client";

import { useEffect, useState } from "react";
import { getStockBySlug } from "@/actions";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStock = async () => {
    const { stock } = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading ? (
        <p className="antialiased font-semibold text-sm">Stock: {stock}</p>
      ) : (
        <p className="antialiased w-16 font-semibold text-sm bg-gray-200 animate-pulse">&nbsp;</p>
      )}
    </>
  );
};
