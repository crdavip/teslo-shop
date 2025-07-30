"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Error in obtaining categories");
  }
};
