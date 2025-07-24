export const revalidate = 60

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { ValidGender } from "@/interfaces";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryIDPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page: pageTemp } = await searchParams;
  const page = pageTemp ? parseInt(pageTemp) : 1;
  const { products, totalPages, totalProducts } = await getPaginatedProductsWithImages({
    page,
    gender: gender as ValidGender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const label: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  return (
    <>
      <Title title={`Productos para ${label[gender]}`} subtitle={`Tenemos ${totalProducts} productos en este género`} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
