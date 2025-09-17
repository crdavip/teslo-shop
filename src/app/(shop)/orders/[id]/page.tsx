import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { OrderStatus, PayPalButton, Title } from "@/components";
import { getOrderById } from "@/actions";
import { currencyFormat } from "@/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;

  const res = await getOrderById(id);

  if (!res?.ok) {
    notFound();
  }

  const { order } = res;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Pedido #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />
            {order?.OrderItem.map((item) => (
              <div key={`${item.product.slug}-${item.size}`} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  className="mr-5 rounded h-[100px]"
                  width={100}
                  height={100}
                  priority
                />
                <div>
                  <Link className="hover:text-blue-400 cursor-pointer" href={`/product/${item.product.slug}`}>
                    <p className="font-bold">
                      {item.product.title} - Talla {item.size}
                    </p>
                  </Link>
                  <p>
                    {currencyFormat(item.price)} x {item.quantity}
                  </p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div>
              <p className="text-xl">
                {order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}
              </p>
              <p>{order?.OrderAddress?.address}</p>
              <p>{order?.OrderAddress?.address2}</p>
              <p>{order?.OrderAddress?.postalCode}</p>
              <p>
                {order?.OrderAddress?.city}, {order?.OrderAddress?.countryId}
              </p>
              <p>{order?.OrderAddress?.phone}</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 my-5" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de pedido</h2>
            <div className="grid grid-cols-2">
              <span>Cantidad</span>
              <span className="text-right">
                {order?.itemsInOrder === 1 ? "1 Producto" : `${order?.itemsInOrder} Productos`}
              </span>
              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order!.subTotal)}</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl mt-5 text-right">{currencyFormat(order!.total)}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              {order!.isPaid ? (
                <OrderStatus isPaid={order!.isPaid} />
              ) : (
                <PayPalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
