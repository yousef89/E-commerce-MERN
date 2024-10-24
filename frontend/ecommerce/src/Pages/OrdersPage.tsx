import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import EmptyCartLogo from "../SVGs/EmptyCart";
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function OrdersPage() {
  // Define interfaces matching the actual data structure
  interface OrderItem {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
    _id: string;
  }

  interface Order {
    _id: string;
    address: string;
    total: number;
    orderItems: OrderItem[];
  }

  // Add the type to the useState hook
  const [orders, setOrders] = useState<Order[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  async function fetchData() {
    const response = await fetch(`${baseUrl}/user/my-orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      setErrorMessage("Something went wrong while fetching orders!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const data = await response.json();
    console.log(data); // This logs your orders to the console
    setOrders(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center pb-10 ">

      {orders.length === 0 && (
        <div className="flex flex-col w-[100%] justify-center items-center mt-[17%] gap-5">
          <EmptyCartLogo width={100} height={100}></EmptyCartLogo>
          <p className="text-[25px]">Add items to review your orders</p>
        </div>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border-2 rounded-lg w-[40%] p-5 bg-white shadow-md mb-10"
        >
          <div className="py-3">
            {order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-5 min-h-[100px]"
                >
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-28"
                  />
                  <p className="text-[20px]">{item.productTitle}</p>
                  <div className="flex items-center gap-5 ml-auto mr-8">
                    <p>
                      {item.quantity} x {item.unitPrice} EGP
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Add items to review your orders.</p>
            )}
          </div>
          <hr className="py-3"></hr>
          <div className="flex flex-col w-[100%]">
            <p className="text-[20px]">Address: {order.address}</p>
            <p className="text-[20px]">Total: {order.total} EGP</p>
          </div>
        </div>
      ))}
    </div>
  );
}
