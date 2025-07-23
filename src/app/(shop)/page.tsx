import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

export default async function HomePage() {
  const { products } = await getPaginatedProductsWithImages();
  console.log(products);
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
    </>
  );
}
