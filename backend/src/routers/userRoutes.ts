import express from "express";
import { Login, Register } from "../Services/userServices";

const router = express.Router();

router.post("/register" , async (request , response) =>{
    try{
        const { firstName , lastName , email , password } = request.body;
        const { statusCode , data } = await Register({ firstName , lastName , email , password });
        response.status(statusCode).json(data);
    }catch(error){
        response.status(500).json("something went wrong!");
    }
});


router.post("/login" , async (request , response) =>{
    try{
        const {email , password} = request.body;
        const {statusCode , data} = await Login({email , password});
        response.status(statusCode).json(data);
    }catch(error){
        response.status(500).json("something went wrong!");
    }
});

export default router;