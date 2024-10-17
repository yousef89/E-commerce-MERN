import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
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
  updateCart: (productId: string , quantity: number) => void;
}

const cartContext = createContext<CartType>({
  cartItems: [],
  totalAmount: 0,
  addToCart: () => {},
  updateCart: () => {}
});

export function useCart() {
  return useContext(cartContext);
}

interface CartProviderType {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderType) {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("token is not valid!");
      console.log(error);
      return;
    }
    async function fetchData() {
      const response = await fetch("http://localhost:3001/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError("data didnt fetch, something went wrong!");
        console.log(error);
        return;
      }
      const data = await response.json();

      const cartMap = data.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          quantity,
          unitPrice: product.price,
        })
      );

      setCartItems(cartMap);
      setTotalAmount(data.totalAmount);
    }
    fetchData();
  }, []);

  async function addToCart(productId: string) {
    try {
      const response = await fetch("http://localhost:3001/cart/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      console.log(cart);
      


    } catch (error) {
      console.log(error);
    }
  }


  async function updateCart(productId: string , quantity: number) {
    try {
      const response = await fetch("http://localhost:3001/cart/items", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        setError("faild to update to cart!");
        return;
      }

      const cart = await response.json();
      const cartMap = cart.items.map(
        ({ product, quantity }: { product: any; quantity: number }) => ({
          productId: product._id,
          title: product.title,
          productImage: product.image,
          quantity,
          unitPrice: product.price,
        })
      );

      setCartItems(cartMap);
      setTotalAmount(cart.totalAmount);

      console.log(cart);
      


    } catch (error) {
      console.log(error);
    }
  }
  return (
    <cartContext.Provider value={{ cartItems, totalAmount, addToCart , updateCart }}>
      {children}
    </cartContext.Provider>
  );
}
