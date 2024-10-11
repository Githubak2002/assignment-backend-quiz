import mongoose, { Mongoose } from "mongoose";


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export  const User = mongoose.models.User || mongoose.model("User", userSchema);


