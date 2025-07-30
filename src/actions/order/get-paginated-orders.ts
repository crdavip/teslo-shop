"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No hay sesión activa",
      totalPages: 0,
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const totalCount = await prisma.order.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      totalPages,
      totalOrders: totalCount,
      orders,
      message: "",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Error in obtaining orders");
  }
};
