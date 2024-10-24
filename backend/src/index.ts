import dotenv from "dotenv";
import express from "express";
import mongoose, { mongo } from "mongoose";
import userRouter from "./routers/userRoutes";
import productRoute from "./routers/productRoutes";
import cartRoute from "./routers/cartRoutes";
import cors from "cors";
import { seedProducts } from "./Services/productServices";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND

app.use(express.json());

app.use(cors({
  origin: frontendUrl,  // Allow only your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
}));

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

async function connectToMongo() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("connected!");
  } catch (error) {
    console.log("failed to connect!");
  }
}
connectToMongo();
seedProducts();

app.use("/user", userRouter);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
