import { generateToken } from '../lib/jwt.js';
import User from '../models/user.model.js';
import { comparePassword, hashPassword } from '../services/password.service.js';
import cloudinary from "../lib/cloudinary.js";

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        //Validate filed
        if( !email || !password )
            throw new Error("All fields are required!");

        const userExits = await User.findOne({
            email
        });
        if(!userExits)
            throw new Error("No account found with this email.");

        const matched = await comparePassword( password, userExits.password );
        if(!matched)
            throw new Error("Incorrect password. Please try again.");
        generateToken({ userId: userExits._id }, res);
        return res.status(200).json({ message: "Login successful. Welcome back!", user: userExits });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const register = async(req, res) => {
    try {
        const { email, fullname, password } = req.body;

        // Validate fields
        if( !email || !fullname || !password )
            throw new Error("All fields are required!");
        
        const userExists = await User.findOne({ email });

        if( userExists) throw new Error("Email already in use.");

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ email, fullname, password: hashedPassword });
        generateToken({ userId: newUser._id }, res);
        return res.status(201).json({ message: "Account created successfully.", user: { _id: newUser._id, fullname, email }});

    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logged out successfully!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async(req, res) => {
    try {
        return res.status(200).json({user: req.user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}