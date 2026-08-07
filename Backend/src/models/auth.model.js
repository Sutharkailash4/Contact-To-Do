import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required"],
        unique : [true, "Username should be unique"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email should be unique"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    }
});

const userModel = mongoose.model("User", userschema);

export default userModel;