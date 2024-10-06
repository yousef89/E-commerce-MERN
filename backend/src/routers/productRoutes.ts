import express from "express"
import { getAllProducts } from "../Services/productServices";


const router = express.Router();



router.get("/" , async (request , response) => {
    try{
        const products = await getAllProducts();
        response.status(200).send(products);
    }catch(error){
        response.status(500).send("something went wrong!");
    }
});


export default router;