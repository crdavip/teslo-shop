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

    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProductPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.title} no tiene cantidad`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) throw new Error(`${product.title} no tiene stock`);
      });

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder: productsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order,
        updatedProducts,
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order.id,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("ErrorCreatingOrder");
  }
};
