import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { ValidGender } from "@/interfaces";

interface Props {
  params: {
    id: ValidGender;
  };
}

export default async function CategoryIDPage({ params }: Props) {
  const { id } = await params;

  const products = initialData.products.filter((product) => product.gender === id);

  if (products.length === 0) {
    notFound();
  }

  const label: Record<ValidGender, string> = {
    "men": "Hombres",
    "women": "Mujeres",
    "kid": "Niños",
    "unisex": "Todos"
  }

  return (
    <>
      <Title title={`Productos para ${label[id]}`} subtitle={`Tenemos ${products.length} productos en este género`} />
      <ProductGrid products={products} />
    </>
  );
}
