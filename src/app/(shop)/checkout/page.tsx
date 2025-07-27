import Link from "next/link";
import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar pedido" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Modificar productos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
            <ProductsInCart />
          </div>
            <OrderSummary />
        </div>
      </div>
    </div>
  );
}
