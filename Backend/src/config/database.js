import mongoose from "mongoose";

const ConnectedToMongodb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Failed to connect, ",error.message);
    }
}

export default ConnectedToMongodb;