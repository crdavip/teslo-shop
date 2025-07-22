import { initialData } from "./seed";
import { prisma } from "../lib/prisma";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories } = initialData;
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  console.log("Seed successfully executed");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
