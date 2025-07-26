"use server";

import { prisma } from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!storeAddress) {
      return {
        ok: false,
        message: "El usuario no tiene una dirección",
      };
    }

    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
    return {
      ok: true,
      message: "Dirección eliminada",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("ErrorDeletingAddress");
    
  }
};
