import express from "express"
import mongoose, { mongo } from "mongoose"
import userRouter from "./routers/userRoutes";

const app = express();
const port = 3001;


app.use(express.json());

async function connectToMongo(){
    try{
        await mongoose.connect("mongodb://localhost:27017/ecommerce");
        console.log("connected!");
    }
    catch(error){
        console.log("failed to connect!");
    }
}
connectToMongo();

app.use("/users" , userRouter);

app.listen(port , () => {
    console.log(`server is running at: http://localhost/${port}`);
})
