import productModel from "../models/productModel";

export async function getAllProducts() {
  return await productModel.find();
}

export async function seedProducts() {
  try {
    const products = [
      {
        title: "Dell laptop",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/3/KD/UH/AA/85187169/window-10-dell-laptop.jpg",
        price: 41600,
        stock: 10,
      },
      {
        title: "MacBook Air M1",
        image: "https://cdn.shoplightspeed.com/shops/638486/files/29683203/apple-13-inch-macbook-air-apple-m1.jpg",
        price: 39900,
        stock: 20,
      },
      {
        title: "HP laptop",
        image: "https://m.media-amazon.com/images/I/71voq8mpPvS._AC_SX679_.jpg",
        price: 12900,
        stock: 30,
      },
      {
        title:"MacBook Air M2",
        image:"https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SX522_.jpg",
        price:41300,
        stock: 20
      },
      {
        title:"HP pavilion x360",
        image:"https://m.media-amazon.com/images/I/81BLK5ExrbL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
        price:36400,
        stock: 20
      },
      {
        title:"HP ProBook 450",
        image:"https://m.media-amazon.com/images/I/61FvG1So3JL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        price:23100,
        stock: 20
      },
      {
        title:"Dell Latitude 5410",
        image:"https://m.media-amazon.com/images/I/61CpL-+6xCL._AC_SX300_SY300_.jpg",
        price:34400,
        stock: 20
      },
      {
        title:"MacBook Pro M2",
        image:"https://m.media-amazon.com/images/I/61bwiPRcv2L._AC_SX522_.jpg",
        price:45300,
        stock: 20
      },
      {
        title:"MacBook Air M3",
        image:"https://m.media-amazon.com/images/I/61JJlVirlnL._AC_SX522_.jpg",
        price:52900,
        stock: 20
      },
      {
        title:"Lenovo ThinkPad X1",
        image:"https://m.media-amazon.com/images/I/61XXyxsfdRL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
        price:33000,
        stock: 20
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
