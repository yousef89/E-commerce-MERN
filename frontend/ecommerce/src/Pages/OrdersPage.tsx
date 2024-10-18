import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

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
    const response = await fetch("http://localhost:3001/user/my-orders", {
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
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-[40px]">My Orders</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {/* If there are no orders */}
      {orders.length === 0 && <p>No orders found.</p>}

      {/* Mapping through orders */}
      {orders.map((order) => (
        <div key={order._id} className="border-2 rounded-lg w-[60%] p-5">
          <p>Address: {order.address}</p>
          <p>Total: {order.total} EGP</p>

          <h3 className="font-semibold mt-4">Order Items:</h3>
          <div className="pl-5">
            {order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-5 my-2">
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-16 h-16"
                  />
                  <div>
                    <p>{item.productTitle}</p>
                    <p>
                      {item.quantity} x {item.unitPrice} EGP
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in this order.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
