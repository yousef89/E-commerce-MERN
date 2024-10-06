import mongoose, { Schema , Document, ObjectId } from "mongoose";


export interface IOrderItems {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
}

export interface IOrder extends Document {
    orderItems: IOrderItems;
    total: number;
    userId: ObjectId | string;
    address: string;
}


const orderItemSchema = new Schema<IOrderItems>({
    productTitle: {type: String , required: true},
    productImage: {type: String , required: true},
    unitPrice: {type: Number , required: true},
    quantity: {type: Number , required: true},
})


const orderSchema = new Schema<IOrder>({
    orderItems: [orderItemSchema],
    total: {type: Number , required: true},
    userId: {type: Schema.Types.ObjectId , ref: "User", required: true},
    address: {type: String , required: true},
})


export const orderModel = mongoose.model<IOrder>("Order" , orderSchema);