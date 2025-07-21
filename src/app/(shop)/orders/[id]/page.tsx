import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Pedido #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                "bg-red-500": false,
                "bg-green-700": true,
              })}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pago pendiente</span> */}
              <span className="mx-2">Pago completado</span>
            </div>
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  className="mr-5 rounded h-[100px]"
                  width={100}
                  height={100}
                  priority
                />
                <div>
                  <p className="font-bold">{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div>
              <p className="text-xl">Cristian David Paniagua</p>
              <p>Calle 51 Sur #67-130, San Antonio de Prado</p>
              <p>Medellín, Antioquia</p>
              <p>3146809508</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 my-5" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>Cantidad</span>
              <span className="text-right">3 Productos</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Envío</span>
              <span className="text-right">$15</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">$115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5", {
                  "bg-red-500": false,
                  "bg-green-700": true,
                })}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pago pendiente</span> */}
                <span className="mx-2">Pago completado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
