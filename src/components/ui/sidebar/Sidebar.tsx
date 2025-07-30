"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useUIStore } from "@/store";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import clsx from "clsx";

export const Sidebar = () => {
  const isSideOpen = useUIStore((state) => state.isSideOpen);
  const closeSide = useUIStore((state) => state.closeSide);

  const { data: session } = useSession();
  const isAuth = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  const onLogout = async () => {
    await signOut();
  };

  return (
    <div>
      {isSideOpen && <div className="fixed top-0 left-0 w-screen h-screen z-101 bg-black opacity-30" />}
      {isSideOpen && (
        <div onClick={closeSide} className="fade-in fixed top-0 left-0 w-screen h-screen z-101 backdrop-blur-sm" />
      )}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[250px] sm:w-[400px] h-screen bg-white z-102 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideOpen,
          }
        )}
      >
        <IoCloseOutline size={50} className="absolute top-5 right-5 cursor-pointer" onClick={closeSide} />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        {isAuth && (
          <>
            <Link
              href="/profile"
              onClick={closeSide}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Mi Perfil</span>
            </Link>
            <Link
              href="/orders"
              onClick={closeSide}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Mis Pedidos</span>
            </Link>
          </>
        )}

        {!isAuth && (
          <Link
            href="/auth/login"
            onClick={closeSide}
            className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}
        {isAuth && (
          <button
            className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => onLogout()}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {isAdmin && (
          <>
            <div className="w-full h-px bg-gray-300 my-5" />
            <Link
              href="/admin/products"
              onClick={closeSide}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href="/admin/orders"
              onClick={closeSide}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Pedidos</span>
            </Link>
            <Link
              href="/admin/users"
              onClick={closeSide}
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
