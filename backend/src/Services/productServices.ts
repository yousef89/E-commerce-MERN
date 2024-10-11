import productModel from "../models/productModel";

export async function getAllProducts() {
  return await productModel.find();
}

export async function seedProducts() {
  try {
    const products = [
      {
        title: "Dell laptop",
        image: "http://localhost:3001/assets/productImages/dell.jpg", // Updated to point to your backend
        price: 40000,
        stock: 10,
      },
      {
        title: "MacBook M1",
        image: "http://localhost:3001/assets/productImages/macbook.jpeg", // Path to local image
        price: 30000,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "http://localhost:3001/assets/productImages/hp.jpeg", // Path to local image
        price: 12000,
        stock: 30,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (error) {
    console.log("cannot see the database", error);
  }
}
