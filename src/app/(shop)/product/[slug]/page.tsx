export const revalidate = 604800;

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/actions";
import { QuantitySelector, SizeSelector, SlideShow, SlideShowMobile, StockLabel } from "@/components";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[0]}`]
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-0 sm:mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <SlideShowMobile className="block md:hidden" title={product.title} images={product.images} />
        <SlideShow className="hidden md:block" title={product.title} images={product.images} />
      </div>
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className="antialiased font-bold text-xl">{product.title}</h1>
        <p className="text-lg mb-5">${product.price}</p>
        <h3 className="font-bold text-sm">Tallas</h3>
        <SizeSelector selectedSize={product.sizes[1]} sizes={product.sizes} />
        <h3 className="font-bold text-sm">Cantidad</h3>
        <QuantitySelector quantity={1} />
        <button className="btn-primary my-5">Agregar al carrito</button>
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
