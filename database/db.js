import mongoose from "mongoose";

const DatabaseDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
};

export default DatabaseDB;
