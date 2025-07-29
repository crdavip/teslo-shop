"use server";

import { prisma } from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "El pedido no existe",
      };
    }

    return {
      ok: true
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ok: false,
      message: "ErrorSavingTransactionId",
    };
  }
};
