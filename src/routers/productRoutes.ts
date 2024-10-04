import express from "express"
import { getAllProducts } from "../Services/productServices";


const router = express.Router();



router.get("/" , async (request , response) => {
    const products = await getAllProducts();
    response.status(200).send(products);
});


export default router;