import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongoDB_url = process.env.MONGODB_URL;

export const connectDB = async () => {
  if(!mongoDB_url){
    console.log("MongoDB URL is not defined");
    process.exit(1);
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    return {msg:"DB connected! ", success:true}
  } catch (err) {
    console.log("err connecting to DB:", err.message);
    return {err, msg:"error connecting DB", success:false}
  }
}