"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const changeUserRole = async (userId: string, role: string) => {
  try {
    const session = await auth();

    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "No hay sesión activa",
      };
    }

    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("ErrorEditingRole");
  }
};
