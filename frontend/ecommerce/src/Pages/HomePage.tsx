import { useEffect } from "react"

export default function HomePage(){

    useEffect(() =>{
        async function getProducts() {
            try {
                const response = await fetch("http://localhost:3001/product");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // Add await here
                console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        getProducts();
    },[])
    return(
        <div>Home Page.</div>
    )
}