import productModel from "../models/productModel";

export async function getAllProducts() {
  return await productModel.find();
}

export async function seedProducts() {
  try {
    const products = [
      {
        title: "Dell laptop",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/3/KD/UH/AA/85187169/window-10-dell-laptop.jpg", // Updated to point to your backend
        price: 40000,
        stock: 10,
      },
      {
        title: "MacBook M1",
        image: "https://cdn.shoplightspeed.com/shops/638486/files/29683203/apple-13-inch-macbook-air-apple-m1.jpg", // Path to local image
        price: 30000,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "https://m.media-amazon.com/images/I/71voq8mpPvS._AC_SX679_.jpg", // Path to local image
        price: 12000,
        stock: 30,
      },
      {
        title: "Dell laptop",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/3/KD/UH/AA/85187169/window-10-dell-laptop.jpg", // Updated to point to your backend
        price: 40000,
        stock: 10,
      },
      {
        title: "MacBook M1",
        image: "https://cdn.shoplightspeed.com/shops/638486/files/29683203/apple-13-inch-macbook-air-apple-m1.jpg", // Path to local image
        price: 30000,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "https://m.media-amazon.com/images/I/71voq8mpPvS._AC_SX679_.jpg", // Path to local image
        price: 12000,
        stock: 30,
      },
      {
        title: "Dell laptop",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/3/KD/UH/AA/85187169/window-10-dell-laptop.jpg", // Updated to point to your backend
        price: 40000,
        stock: 10,
      },
      {
        title: "MacBook M1",
        image: "https://cdn.shoplightspeed.com/shops/638486/files/29683203/apple-13-inch-macbook-air-apple-m1.jpg", // Path to local image
        price: 30000,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "https://m.media-amazon.com/images/I/71voq8mpPvS._AC_SX679_.jpg", // Path to local image
        price: 12000,
        stock: 30,
      },
      {
        title: "Dell laptop",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/3/KD/UH/AA/85187169/window-10-dell-laptop.jpg", // Updated to point to your backend
        price: 40000,
        stock: 10,
      },
      {
        title: "MacBook M1",
        image: "https://cdn.shoplightspeed.com/shops/638486/files/29683203/apple-13-inch-macbook-air-apple-m1.jpg", // Path to local image
        price: 30000,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "https://m.media-amazon.com/images/I/71voq8mpPvS._AC_SX679_.jpg", // Path to local image
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
