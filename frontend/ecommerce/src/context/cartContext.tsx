import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BASE_URL;
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
  updateCart: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  fetchData: () => void;
  clearItems: () => void;
}

const cartContext = createContext<CartType>({
  cartItems: [],
  totalAmount: 0,
  addToCart: () => {},
  updateCart: () => {},
  removeItem: () => {},
  fetchData: () => {},
  clearItems: () => {},
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

  async function fetchData() {
    const response = await fetch(`${baseUrl}/cart`, {
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

  useEffect(() => {
    if (!token) {
      setError("token is not valid!");
      console.log(error);
      return;
    }
    fetchData();
  }, []);

  async function addToCart(productId: string) {
    try {
      const response = await fetch(`${baseUrl}/cart/items`, {
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
        toast.error("Item already exists in cart", {
          className: "bg-red-500 text-white border border-red-600",
        });
        return;
      }

      const cart = await response.json();
      console.log(cart);

      toast.success("Item added to cart", {
        className: "bg-green-500 text-white border border-green-600",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCart(productId: string, quantity: number) {
    try {
      const response = await fetch(`${baseUrl}/cart/items`, {
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
        toast.error("Faild to update to cart", {
          className: "bg-red-500 text-white border border-red-600",
        });
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

  async function removeItem(productId: string) {
    try {
      const response = await fetch(`${baseUrl}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Faild to delete item from cart", {
          className: "bg-red-500 text-white border border-red-600",
        });
        return;
      }
      toast.success("Item has been removed", {
        className: "bg-green-500 text-white border border-green-600",
      });
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

  async function clearItems() {
    try {
      const response = await fetch(`${baseUrl}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error("Faild to delete item from cart");
        return;
      }
      toast.success("Cart has been cleared", {
        className: "bg-green-500 text-white border border-green-600",
      });
      setCartItems([]);
      setTotalAmount(0);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addToCart,
        updateCart,
        removeItem,
        fetchData,
        clearItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
