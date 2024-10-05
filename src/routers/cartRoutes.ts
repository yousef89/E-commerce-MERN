import express from "express"
import { addItemsToCart, getActiveCartForUser } from "../Services/cartServices";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";


const router = express.Router();


router.get("/",validateJWT ,async (request:ExtendRequest , response) =>{
    const userId = request?.user?._id;
    const cart = await getActiveCartForUser({userId});
    response.status(200).send(cart);
})

router.post("/items", validateJWT , async (request: ExtendRequest , response) =>{
    const userId = request?.user?._id;
    const {productId , quantity} = request.body;
    const {statusCode , data} = await addItemsToCart({userId , productId , quantity});
    response.status(statusCode).send(data);

})

export default router;