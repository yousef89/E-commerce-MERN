import { useEffect } from "react";
import { useCart } from "../context/cartContext";

export default function CheckOutPage() {
  const { cartItems, totalAmount, fetchData } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="text-[40px]">my Cart</h1>
      {cartItems.map((item) => (
        <div className="border-2 rounded-lg w-[50%] px-10 py-4 flex items-center ">
          <img src={item.productImage} className="size-32"></img>
          <div className="flex flex-col pl-5">
            <h2 className="text-[20px]">{item.title}</h2>
            <h3>
              {item.quantity} x {item.unitPrice} EGP
            </h3>
          </div>
        </div>
      ))}
      <div className="w-[50%] pl-5 flex">
        <h1 className="mr-auto text-[20px]">Total Amount: {totalAmount} EGP</h1>
        <div className="flex gap-1"></div>
      </div>
    </div>
  );
}
