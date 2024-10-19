import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const { cartItems, totalAmount, fetchData } = useCart();
  const [address, setAddress] = useState("");
  const [errorMessage , setErrorMessage] = useState("");
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function handlePayment() {
    try {
      if (!address) {
        setErrorMessage(`please enter your address`);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
      const response = await fetch("http://localhost:3001/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address
        }),
      });

      if (!response.ok) {
        setErrorMessage("something went wrong in payment process!");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      }
      setErrorMessage("");
      navigate("/success");
    } catch (error) {
      console.log(error);
      setErrorMessage("something went wrong in payment process!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  return (
    <div className=" flex flex-col justify-center items-center gap-10 pb-20">
      <h1 className="text-[40px]">Check out</h1>
      <div className="border rounded-xl w-[40%] hover:bg-slate-100 transition">
        {cartItems.map((item) => (
          <div className=" w-[100%] px-10 py-4 flex items-center ">
            <img src={item.productImage} className="w-28"></img>
            <h2 className="text-[20px] pl-5">{item.title}</h2>
            <div className="flex items-center ml-auto pr-4">
              <h3>
                {item.quantity} x {item.unitPrice} EGP
              </h3>
            </div>
          </div>
        ))}
      </div>
      
        
      <div className="w-[40%] pl-5 flex">
        <h1 className="mr-auto text-[20px]">Total Amount: {totalAmount} EGP</h1>
      </div>
        <input
          placeholder="enter your address"
          className=" w-[40%] text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition"
          name="firstName"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handlePayment} className="text-white text-[20px] w-[90px] h-[30px] bg-blue-500 rounded-lg hover:bg-blue-600 transition">Pay now</button>
        {errorMessage && <h1 className="text-red-500 mt-2">{errorMessage}</h1>}
    </div>
  );
}
