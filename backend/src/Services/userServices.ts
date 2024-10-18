import userModel from "../models/userModel"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { orderModel } from "../models/orederModel";

interface RegisterParams {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


export async function Register({ firstName , lastName , email , password }: RegisterParams){
    const findUser = await userModel.findOne({ email });

    if(findUser){
        return { data: "User already exists!" , statusCode: 400};
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new userModel({ firstName , lastName , email , password: hashedPassword });
    await newUser.save();

    return {data: GenerateJWT({ firstName , lastName , email }) , statusCode: 200};
}

interface LoginParams {
    email: string,
    password: string
}


export async function Login({ email , password }:LoginParams) {
    const findUser = await userModel.findOne({ email });

    if(!findUser){
        return { data: "Wrong emall or password" , statusCode: 400};
    }

    const passwordMatch = await bcrypt.compare(password , findUser.password);

    if(passwordMatch){
        return {data: GenerateJWT({ email , firstName: findUser.firstName , lastName: findUser.lastName }) , statusCode: 200};
    }
    else{
        return { data: "Wrong emall or password" , statusCode: 400};
    }
    
}

interface getMyOrdersType{
    userId: string;
}

export async function getMyOrders({userId}: getMyOrdersType){
 try{
    const orders = await orderModel.find({userId});
    return {data: orders , statusCode: 200};
 }catch(error){
    throw error;
 } 
}


function GenerateJWT(data: any){
    return jwt.sign(data , process.env.JWT_SECRET || "")
}