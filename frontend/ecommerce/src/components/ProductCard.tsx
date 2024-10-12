import { useCart } from "../context/cartContext";
import Products from "../types/productType";

export default function ProductCard({ _id , title, price, stock, image }: Products) {

  const {addToCart} = useCart();
  return (
    <div className=" shadow-md px-4 flex flex-col justify-center items-center">
      <img src={image}></img>
      <div className="mr-auto mb-4 ml-4">
        <h1 className="text-[30px] pb-2">{title}</h1>
        <h3>{price} EGP</h3>
        <h3 className="pb-2">available: {stock}</h3>
        <button onClick={() => addToCart(_id)} className="bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 active:bg-blue-800 transition">
          add to cart
        </button>
      </div>
    </div>
  );
}
