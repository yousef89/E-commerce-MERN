import express from "express"
import { addItemsToCart, checkout, clearCart, deleteItemInCart, getActiveCartForUser, updateItemsToCart } from "../Services/cartServices";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";


const router = express.Router();

router.get("/",validateJWT ,async (request:ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const cart = await getActiveCartForUser({userId});
        response.status(200).send(cart);
    }catch(error){
        response.status(500).send("something went wrong!");
    }   
});

router.post("/items", validateJWT , async (request: ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const {productId , quantity} = request.body;
        const {statusCode , data} = await addItemsToCart({userId , productId , quantity});
        response.status(statusCode).send(data);
    }catch(error){
        response.status(500).send("something went wrong!");
    }
});

router.put("/items", validateJWT , async (request: ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const {productId , quantity} = request.body;
        const {statusCode , data} = await updateItemsToCart({userId , productId , quantity});
        response.status(statusCode).send(data);
    }catch(error){
        response.status(500).send("something went wrong!");
    }
});

router.delete("/items/:productId", validateJWT , async (request: ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const { productId } = request.params;
        const {statusCode , data} = await deleteItemInCart({userId , productId});
        response.status(statusCode).send(data);
    }catch(error){
        response.status(500).send("something went wrong!");
    }
});

router.delete("/", validateJWT , async (request: ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const {statusCode , data} = await clearCart({userId});
        response.status(statusCode).send(data);
    }catch(error){
        response.status(500).send("something went wrong!");
    } 
});

router.post("/checkout" , validateJWT , async (request: ExtendRequest , response) =>{
    try{
        const userId = request?.user?._id;
        const {address} = request.body;
        const {statusCode , data} = await checkout({userId , address});
        response.status(statusCode).send(data);
    }catch(error){
        response.status(500).send("something went wrong!");
    }   
});


export default router;