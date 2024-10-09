import dotenv from "dotenv";
import express from "express"
import mongoose, { mongo } from "mongoose"
import userRouter from "./routers/userRoutes";
import productRoute from "./routers/productRoutes";
import cartRoute from "./routers/cartRoutes";
import { seedProucts } from "./Services/productServices";
import cors from "cors";

dotenv.config();
const app = express();
const port = 3001;


app.use(express.json());
app.use(cors());

async function connectToMongo(){
    try{
        await mongoose.connect(process.env.DATABASE_URL || "");
        console.log("connected!");
    }
    catch(error){
        console.log("failed to connect!");
    }
}
connectToMongo();
seedProucts();

app.use("/user" , userRouter);
app.use("/product" , productRoute);
app.use("/cart" , cartRoute);

app.listen(port , () => {
    console.log(`server is running at: http://localhost/${port}`);
})
