"use server";

import { revalidatePath } from "next/cache";
import { PayPalOrderStatusResponse } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();
  console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: "No hay token valido",
    };
  }

  const res = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!res) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = res;

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Pedido sin pago en PayPal",
    };
  }

  try {
    const { invoice_id } = purchase_units[0];

    await prisma.order.update({
      where: {
        id: invoice_id,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${invoice_id}`);

    return {
      ok: true,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ok: false,
      message: "El pago no se pudo realizar",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2 = process.env.PAYPAL_OAUTH_URL;

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, "utf-8").toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(`${oauth2}`, { ...requestOptions, cache: "no-store" }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const payPalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const res = await fetch(`${payPalOrderUrl}`, { ...requestOptions, cache: "no-store" }).then((r) => r.json());
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
