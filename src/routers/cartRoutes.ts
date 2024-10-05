import express from "express"
import { getActiveCartForUser } from "../Services/cartServices";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";


const router = express.Router();


router.get("/",validateJWT ,async (requset:ExtendRequest , response) =>{
    const userId = requset.user._id;
    const cart = await getActiveCartForUser({userId});
    response.status(200).send(cart);
})

export default router;