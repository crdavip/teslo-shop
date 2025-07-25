"use client";

import Link from "next/link";
import { authenticate } from "@/actions";
import { useActionState } from "react";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined);
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500"
        name="email"
        id="email"
        type="email"
        autoComplete="off"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500"
        name="password"
        id="password"
        type="password"
        autoComplete="off"
      />

      <button type="submit" className="btn-primary cursor-pointer">Ingresar</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">o</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/register" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};
