import bcryptjs from "bcryptjs";
import { User } from "../Models/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

// ===== Register Controller =====
export const registerController = async (req,res) => {
  const {userName,email,password} = req.body;

  try {
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
      return res.status(400).json({
        message: "User already exists",
        success:false
      })
    }
    
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      userName, 
      email, 
      password:hashedPassword
    });
    
    await user.save();
    
    generateTokenAndSetCookie(res, user._id);
    
    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in register controller → ",error); 
    res.status(400).json({ success: false, msg: error.message });
  }
    
}

// ===== Login Controller =====
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "Invalid Credentials" });

    const isPassCorrect = await bcryptjs.compare(password, user.password);
    if (!isPassCorrect)
      return res.status(400).json({ success: false, msg: "Invalid Credentials" });

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      msg: "Logged in successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in loginController → ", error);
    res.status(400).json({ msg: error.message, success: false });
  }
};

// ===== LogOut Controller =====
export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};