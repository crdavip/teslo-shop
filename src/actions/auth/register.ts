"use server";

import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return {
      ok: true,
      user,
      message: "Usuario creado correctamente"
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al crear el usuario",
    };
  }
};
