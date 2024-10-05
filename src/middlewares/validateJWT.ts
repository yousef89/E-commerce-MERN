import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";


export interface ExtendRequest extends Request{
    user?: any;
}


async function validateJWT(requset: ExtendRequest , response: Response , next: NextFunction){
    const authorization = requset.get("authorization");

    if(!authorization){
        response.status(403).send("authorization header was not provided");
        return;
    }

    const token = authorization.split(" ")[1];

    if(!token){
        response.status(403).send("bearer token not found");
        return;
    }


    jwt.verify(token , "SDFdsfislkj222340928sdfiWDSF" , async (error , payload) =>{
        if(error){
            response.status(403).send("invalid token");
            return;
        }

        if(!payload){
            response.status(403).send("invalid token payload");
            return;
        }

        const userPayload = payload as {
            email: string,
            firstName: string,
            lastName: string
        }

        const user = await userModel.findOne({email: userPayload.email });
        requset.user = user;
        next();
    })
    
}


export default validateJWT;