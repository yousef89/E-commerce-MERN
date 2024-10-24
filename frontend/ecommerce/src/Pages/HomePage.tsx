import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Products from "../types/productType";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function HomePage() {
    const [product , setProduct] = useState<Products[]>([]);


  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(`${baseUrl}/product`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);
  return (
      <div className="grid grid-cols-4 gap-10 m-5">
        {product.map((p)=>(
            <ProductCard _id = {p._id} image = {p.image} price = {p.price} stock = {p.stock} title = {p.title}></ProductCard>
        ))}    
      </div>
  );
}
