import { cartModel } from "../models/cartModel"
import productModel from "../models/productModel";

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

interface AddToCart{
    productId: any;
    quantity: number;
    userId: string;
}

export async function addItemsToCart({userId , productId , quantity} : AddToCart){
    const cart = await getActiveCartForUser({userId});

    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if(existsInCart){
        return {data: "item already exists in the cart!" , statusCode: 400};
    }

    const product = await productModel.findById(productId);

    if(!product){
        return {data: "product does not exsit!" , statusCode: 400};
    }

    if(product.stock < quantity){
        return {data: "low stock for item" , statusCode: 400};
    }


    cart.items.push({product: productId , unitPrice: product.price , quantity});

    cart.totalAmount += product.price * quantity;
    
    const updatedCart = await cart.save();

    return {data: updatedCart , statusCode: 200};
}