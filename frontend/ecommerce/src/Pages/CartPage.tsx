import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export default function CartPage() {
  const { token } = useAuth();
  const [cart, setCart] = useState();
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
      setCart(data);
    }
    fetchData();
  }, []);

  console.log(cart);
  return <div>My Cart</div>;
}
