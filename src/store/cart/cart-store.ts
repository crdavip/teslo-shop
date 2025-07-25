import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartProduct } from "@/interfaces";

interface State {
  cart: CartProduct[];

  getTotalitems: () => number;
  getOrderSummary: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCart = cart.some((item) => item.id === product.id && item.size === product.size);

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      getTotalitems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter((item) => item.id !== product.id || item.size !== product.size);
        set({ cart: updatedCartProducts });
      },
      getOrderSummary: () => {
        const { cart } = get();

        const subTotal = cart.reduce((subTotal, item) => item.quantity * item.price + subTotal, 0);
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          totalItems,
        };
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
