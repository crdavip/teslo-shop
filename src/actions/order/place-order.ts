"use server";

import { auth } from "@/auth.config";
import { Address, ValidSize } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSize;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  const session = await auth();
  if (!session?.user.id) {
    return {
      ok: false,
      message: "No hay sesión activa",
    };
  }
  const userId = session.user.id;

  try {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds.map((p) => p.productId),
        },
      },
    });

    const productsInOrder = productIds.reduce((count, product) => count + product.quantity, 0);

    const { subTotal, tax, total } = productIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find((product) => product.id === item.productId);
        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("ErrorCreatingOrder");
  }
};
