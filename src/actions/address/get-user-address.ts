"use server";

import { prisma } from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: {
        userId,
      },
    });

    if (!address) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { countryId, address2, id, userId: _, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("ErrorObtainingAddress");
  }
};
