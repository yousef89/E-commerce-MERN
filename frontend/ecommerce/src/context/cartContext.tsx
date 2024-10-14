import { createContext, useContext, useState, ReactNode } from "react";
import { useAuth } from "./authContext";

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
  const {token} = useAuth();
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  async function addToCart(productId: string) {
    try {
      const response = await fetch("http://localhost:3001/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        setError("faild to add to cart!");
        return;
      }

      const cart = await response.json();

      const cartMap = cart.items.map(({ product, quantity }: any) => ({
        productId: product._id,
        title: product.title,
        productImage: product.image,
        quantity,
        unitPrice: product.unitPrice,
      }));

      setCartItems([...cartMap])
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider value={{ cartItems, totalAmount, addToCart }}>
      {children}
    </cartContext.Provider>
  );
}
