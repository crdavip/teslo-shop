"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoWarningOutline } from "react-icons/io5";

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { fullName, email, password } = data;
    console.log({ fullName, email, password });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="email">Nombre</label>
      {errors.fullName?.type === "required" && (
        <p className="text-red-400 text-xs flex items-center gap-1 mb-1">
          <IoWarningOutline /> El nombre es obligatorio
        </p>
      )}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-400",
          {
            "border-red-400": !!errors.fullName,
          }
        )}
        type="text"
        autoFocus
        autoComplete="name"
        {...register("fullName", { required: true })}
      />

      <label htmlFor="email">Correo electrónico</label>
      {errors.email?.type === "required" && (
        <p className="text-red-400 text-xs flex items-center gap-1 mb-1">
          <IoWarningOutline /> El correo es obligatorio
        </p>
      )}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-400",
          {
            "border-red-400": !!errors.email,
          }
        )}
        type="email"
        autoComplete="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Contraseña</label>
      {errors.password?.type === "required" && (
        <p className="text-red-400 text-xs flex items-center gap-1 mb-1">
          <IoWarningOutline /> La contraseña es obligatoria
        </p>
      )}
      <input
        className={clsx(
          "px-5 py-2 border bg-gray-200 rounded mb-5 border-gray-300 focus:outline-0 focus:border-blue-400",
          {
            "border-red-400": !!errors.password,
          }
        )}
        type="password"
        autoComplete="current-password"
        {...register("password", { required: true })}
      />

      <button className="btn-primary cursor-pointer">Crear cuenta</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">o</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ya tengo cuenta
      </Link>
    </form>
  );
};
