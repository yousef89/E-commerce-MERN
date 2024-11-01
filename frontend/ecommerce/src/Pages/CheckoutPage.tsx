import { useEffect, useState } from "react";
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function CheckOutPage() {
  const { cartItems, totalAmount, fetchData } = useCart();
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();
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
      const response = await fetch(`${baseUrl}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address,
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
    <div className=" flex flex-col justify-center items-center gap-7 pb-20 font-josefin px-4">
      <div className="rounded-3xl shadow-md">
        {cartItems.map((item) => (
          <div className=" py-4 px-3 flex items-center bg-white PC:w-[750px] PC:px-10">
            <div className="flex items-center mr-auto">
              <img src={item.productImage} className="w-28"></img>
              <h2 className="text-[20px] pl-5 ">{item.title}</h2>
            </div>
            <div className="flex items-center ml-20">
              <h3>
                {item.quantity} x {item.unitPrice} EGP
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[20px] bg-white rounded-lg px-4 py-4 shadow-md font-extrabold ">
        <h1 className="mr-auto text-[20px] font-extrabold">
          Total Amount: <span className="font-normal">{totalAmount} EGP</span>
        </h1>
      </div>
      <input
        placeholder="enter your address"
        className=" w-[40%] text-center shadow-md border-2 border-gray-400 rounded-md hover:border-blue-400 transition PC:max-w-[500px]"
        name="firstName"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        onClick={handlePayment}
        className="text-white text-[20px] w-[90px] h-[30px] bg-blue-500 rounded-lg hover:bg-blue-600 transition"
      >
        Pay now
      </button>
      {errorMessage && <h1 className="text-red-500 mt-2">{errorMessage}</h1>}
    </div>
  );
}
