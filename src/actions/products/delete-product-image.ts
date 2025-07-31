"use server";

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const delelProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      message: "No se pueden borrar imagenes locales",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/product`);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      ok: false,
      mesagge: "Error deleting image",
    };
  }
};
