import { cartModel } from "../models/cartModel"
import { IOrderItems, orderModel } from "../models/orederModel";
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
    userId: string;
    populateProduct?: boolean;
}

export async function getActiveCartForUser({userId , populateProduct}: GetActiveCartForUser){

    let cart;
    if(populateProduct){
        cart  = await cartModel.findOne({userId , status: "Active"}).populate("itmes.product");
    }
    else{
        cart  = await cartModel.findOne({userId , status: "Active"});
    }

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
    
    await cart.save();

    return {data: await getActiveCartForUser({userId , populateProduct: true}) , statusCode: 200};
}


interface UpdateItemsToCart{
    productId: any;
    quantity: number;
    userId: string;
}

export async function updateItemsToCart({productId , quantity , userId}: UpdateItemsToCart){
    const cart = await getActiveCartForUser({userId});
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if(!existsInCart){
        return {data: "item does not exist in cart!" , statusCode: 400};
    }

    const product = await productModel.findById(productId);

    if(!product){
        return {data: "product does not exsit!" , statusCode: 400};
    }

    if(product.stock < quantity){
        return {data: "low stock for item" , statusCode: 400};
    }


    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);

    let total = otherCartItems.reduce((sum , product) =>{
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0)

    existsInCart.quantity = quantity;
    total += existsInCart.quantity * existsInCart.unitPrice;
    cart.totalAmount = total;

    await cart.save();

    return {data: await getActiveCartForUser({userId , populateProduct: true}) , statusCode: 200};
}


interface DeleteItemInCart{
    productId: any;
    userId: string;
}

export async function deleteItemInCart({productId , userId}: DeleteItemInCart){
    const cart = await getActiveCartForUser({userId});
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);

    if(!existsInCart){
        return {data: "item does not exist in cart!" , statusCode: 400};
    }

    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    let total = otherCartItems.reduce((sum , product) =>{
        sum += product.quantity * product.unitPrice;
        return sum;
    }, 0)

    cart.items = otherCartItems;
    cart.totalAmount = total;

    await cart.save();

    return {data: await getActiveCartForUser({userId , populateProduct: true}) , statusCode: 200};
}

interface ClearCart{
    userId: string;
}

export async function clearCart({userId}: ClearCart){
    const cart = await getActiveCartForUser({userId});

    cart.items = [];
    cart.totalAmount = 0

    const updatedCart = await cart.save();

    return {data: updatedCart , statusCode: 200};
}

interface Checkout{
    userId: string;
    address: string;
}

export async function checkout({userId , address}: Checkout){

    if(!address){
        return {data: "please add the address" , statusCode: 400};
    }


    const cart = await getActiveCartForUser({userId});

    const orderItems: IOrderItems[] = [];

    for (const item of cart.items){
        const product = await productModel.findById(item.product);

        if(!product){
            return {data: "product not found!" , statusCode: 400};
        }

        const orderItem: IOrderItems = {
            productTitle: product.title,
            productImage: product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        }

        orderItems.push(orderItem);
    }

    const order = await orderModel.create({
        orderItems,
        userId,
        total: cart.totalAmount,
        address
    });

    await order.save();

    cart.status = "Completed";
    cart.save();

    return {data: order , statusCode: 200};
}