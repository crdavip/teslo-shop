"use server";

import { z } from "zod";
import { Gender, Product, Size } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  id: z.uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.enum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParse = productSchema.safeParse(data);

  if (!productParse.success) {
    console.log(productParse.error);
    return { ok: false };
  }

  const product = productParse.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...rest } = product;

  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product;
    const tagsArray = rest.tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (id) {
      product = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
      console.log({updatedProduct: product})
    } else {
    }

    return {
    };
  });

  //Revalidar path

  return {
    ok: true,
  };
};
