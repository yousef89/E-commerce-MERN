import productModel from "../models/productModel";

export async function getAllProducts(){
    return await productModel.find();
}


export async function seedProucts(){
    const products = [{title: "Dell laptop" , image: "https://m.media-amazon.com/images/I/51if47n2aPL._AC_SL1000_.jpg" , price: 12000 , stock: 10}];

    const existingProducts = await getAllProducts();


    if(existingProducts.length === 0){
        await productModel.insertMany(products);
    }
}