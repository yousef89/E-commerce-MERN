import { createContext, useContext, useState, ReactNode } from "react";

interface CartItemsType {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
  productImage: string;
}

interface CartType {
  cartItems: CartItemsType[];
  totalAmount: number;
  addToCart: (productId: string) => void;
}

const cartContext = createContext<CartType>({
  cartItems: [],
  totalAmount: 0,
  addToCart: () => {},
});

export function useCart() {
  return useContext(cartContext);
}

interface CartProviderType {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderType) {
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  function addToCart(productId: string) {
    console.log(productId);
  }

  return (
    <cartContext.Provider value={{ cartItems, totalAmount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}