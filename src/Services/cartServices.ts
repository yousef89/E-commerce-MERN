import { cartModel } from "../models/cartModel"

interface CreateCartForUser {
    userId: string
}


async function createCartForUser({userId} : CreateCartForUser){
    const cart = await cartModel.create({userId , totalAmount: 0});
    await cart.save();
    return cart;
}

interface GetActiveCartForUser{
    userId: string
}

export async function getActiveCartForUser({userId}: GetActiveCartForUser){
    let cart = await cartModel.findOne({userId , status: "Active"});

    if(!cart){
        cart = await createCartForUser({userId});
    }

    return cart;
}