import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "User is required"]
    },
    firstName : {
        type : String,
        required : [true, "FirstName is required"]
    },
    lastName : {
        type : String,
        required : [true, "LastName is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"]
    },
    phoneNumber : {
        type : Number,
        required : [true, "Phone Number is required"]
    },
    address : {
        type : String,
        required : [true, "Address is required"]
    }
}, { timestamps: true });

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;