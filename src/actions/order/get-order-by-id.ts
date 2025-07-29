"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No hay session activa",
    };
  }

  try {
    const order = await prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            productId: true,
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return {
        ok: false,
        message: "La orden no existe",
      };
    }

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        return {
          ok: false,
          message: "La orden no es del usuario",
        };
      }
    }

    return {
      ok: true,
      order,
      message: "",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ok: false,
      message: "ErrorObtainingOrder",
    };
  }
};
