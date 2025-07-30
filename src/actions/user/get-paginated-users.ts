"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  const session = await auth();

  try {
    if (session?.user.role !== "admin") {
      return {
        ok: false,
        message: "No hay sesión activa",
        totalPages: 0,
      };
    }

    const users = await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: {
        name: "asc"
      },
    });

    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      currentPage: page,
      totalPages,
      totalUsers: totalCount,
      users,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Error in obtaining users");
  }
};
