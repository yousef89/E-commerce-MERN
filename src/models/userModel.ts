import mongoose ,  {Schema , Document} from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


const UserSchema = new Schema<IUser>({
    firstName: {type: String , required: true},
    lastName: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
})


const userModel = mongoose.model<IUser>("User" , UserSchema);

export default userModel;