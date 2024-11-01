import { useState } from "react";
import { useCart } from "../context/cartContext";
import Products from "../types/productType";

export default function ProductCard({
  _id,
  title,
  price,
  stock,
  image,
}: Products) {
  const { addToCart } = useCart();

  const [isAdding, setIsAdding] = useState(false);

  async function handleAddToCart(_id: string){
    if (isAdding) return;
    setIsAdding(true);
    await addToCart(_id);
    setIsAdding(false);
  };

  return (
    <div className=" shadow-lg px-4 flex flex-col justify-center items-center bg-white transition rounded-xl font-josefin">
      <img src={image} className="w-40 pt-5 "></img>
      <div className="flex items-center justify-center mr-auto w-[100%] PC:mt-auto">
        <div className="mr-auto mb-4 ml-4 mt-auto">
          <h1 className="text-[24px] font-bold pb-2">{title}</h1>
          <h3>{price} EGP</h3>
          <h3 className="pb-2">available: {stock}</h3>
        </div>
        <button
          onClick={() => handleAddToCart(_id)}
          className="bg-blue-500 rounded-md px-2 py-1 text-nowrap hover:bg-blue-600 active:bg-blue-800 transition ml-auto mt-10 mr-4 text-white"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
