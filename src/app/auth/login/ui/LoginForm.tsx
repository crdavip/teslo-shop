"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";
import clsx from "clsx";
import { authenticate } from "@/actions";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/");
    }
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500"
        name="email"
        id="email"
        type="email"
        autoComplete="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-500"
        name="password"
        id="password"
        type="password"
        autoComplete="current-password"
      />

      <LoginButton />

      <div className="flex justify-center h-8 items-end space-x-1 fade-in" aria-live="polite" aria-atomic="true">
        {state === "CredentialsSignin" && (
          <>
            <IoWarningOutline className="h-5 w-5 text-red-400" />
            <p className="text-sm text-red-400">Credenciales Invalidas</p>
          </>
        )}
      </div>

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

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
};
