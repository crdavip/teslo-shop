"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { deleteProductImage } from "./delete-product-image";

export const deleteProduct = async (idProduct: string) => {
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findFirst({
        where: {
          id: idProduct,
        },
        select: {
          ProductImage: true,
          id: true,
        },
      });

      if (!product) {
        throw "ProductNotFound";
      }

      const images = product.ProductImage.map((image) => ({
        imageId: image.id,
        imageUrl: image.url,
      }));

      await Promise.all(images.map((image) => deleteProductImage(image.imageId, image.imageUrl)));

      await tx.product.delete({
        where: {
          id: product.id,
        },
      });

      revalidatePath(`/admin/products`);
      revalidatePath(`/product`);

      console.log("Producto eleminado");
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error);
    throw new Error("ErrorDeletingImages");
  }
};
