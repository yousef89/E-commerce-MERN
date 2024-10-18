import { useEffect } from "react";
import { useCart } from "../context/cartContext";
import DeleteButton from "../SVGs/deleteButton";

export default function CartPage() {
  const { cartItems, totalAmount, updateCart, removeItem, fetchData , clearItems} =
    useCart();

  useEffect(() => {
    fetchData();
  }, []);

  function handleQuantity(productId: string, quantity: number) {
    if (quantity > 0) {
      updateCart(productId, quantity);
    }
  }

  function handleRemoveItem(productId: string) {
    removeItem(productId);
  }

  function handleClearItems(){
    clearItems();
  }

  console.log("cart items: ", cartItems, "total amount: ", totalAmount);

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
          <div className="flex ml-auto gap-2">
            <button
              onClick={() => handleQuantity(item.productId, item.quantity - 1)}
              className="text-white h-7 w-7 bg-blue-500 flex items-center justify-center rounded-md "
            >
              -
            </button>
            <button
              onClick={() => handleQuantity(item.productId, item.quantity + 1)}
              className="text-white h-7 w-7 bg-blue-500 flex items-center justify-center rounded-md "
            >
              +
            </button>

            <button onClick={() => handleRemoveItem(item.productId)}>
              <DeleteButton className="w-6 h-6" fill="#fa2e2e" />
            </button>
          </div>
        </div>
      ))}
      {totalAmount > 0 ? (
        <div className="w-[50%] pl-5 flex">
          <h1 className="mr-auto text-[20px]">
            Total Amount: {totalAmount} EGP
          </h1>
          <button onClick={clearItems} className="text-white px-2 bg-red-600 rounded-lg mr-5">
            Clear items
          </button>
        </div>
      ): (
        <h1 className="text-[20px]">Cart is empty, please add items.</h1>
      )}
    </div>
  );
}
