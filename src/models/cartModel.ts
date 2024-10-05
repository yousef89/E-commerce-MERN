import mongoose, { Schema , Document, ObjectId, mongo } from "mongoose";
import { IProduct } from "./productModel";


const cartStatusEnum = ["Active" , "Completed"];

interface ICartItem{
    product: IProduct,
    unitPrice: number,
    quantity: number
}

interface ICart extends Document{
    userId: ObjectId | string,
    items: ICartItem[],
    totalAmount: number,
    status: "Active" | "Completed"
}


const cartItemSchema = new Schema<ICartItem>({
    product: {type: Schema.Types.ObjectId , ref: "Product" , required: true},
    quantity: {type: Number , required: true , default: 1},
    unitPrice: {type: Number , required: true}
})


const cartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId , ref: "User" , required: true},
    items: [cartItemSchema],
    totalAmount: {type: Number , required: true},
    status: {type: String , enum: cartStatusEnum , default: "Active"}
})

export const cartModel = mongoose.model<ICart>("Cart" , cartSchema);