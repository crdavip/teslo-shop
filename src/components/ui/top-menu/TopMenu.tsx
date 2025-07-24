"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useCartStore, useUIStore } from "@/store";

export const TopMenu = () => {
  const openSide = useUIStore((state) => state.openSide);
  const totalItemsInCart = useCartStore((state) => state.getTotalitems());

  const [cartLoaded, setCartLoaded] = useState(false);
  useEffect(() => {
    setCartLoaded(true);
  }, []);

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className="antialiased font-bold">Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/men">
          Hombres
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/women">
          Mujeres
        </Link>
        <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/gender/kid">
          Niños
        </Link>
      </div>
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            {cartLoaded && totalItemsInCart > 0 && (
              <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button onClick={openSide} className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menu
        </button>
      </div>
    </nav>
  );
};
