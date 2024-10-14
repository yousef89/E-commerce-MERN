import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

export default function CartPage() {
  const { token } = useAuth();
  const {cartItems , totalAmount} = useCart();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!token) {
  //     setError("token is not valid!");
  //     console.log(error);
  //     return;
  //   }
  //   async function fetchData() {
  //     const response = await fetch("http://localhost:3001/cart", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       setError("data didnt fetch, something went wrong!");
  //       console.log(error);
  //       return;
  //     }
  //     const data = await response.json();
  //     setCart(data);
  //   }
  //   fetchData();
  // }, []);

  console.log("cart items: " , cartItems ,"total amount: ", totalAmount);

  return <div>My Cart</div>;
}
