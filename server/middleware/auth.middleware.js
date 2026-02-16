import { verifyToken } from "../lib/jwt.js";
import User from "../models/user.model.js";


export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({message: "UnAuthorized access! No token found!"});
        const decoded = verifyToken(token);
        if(!decoded) return res.status(401).json({ message: "Session expired! Login again!"});
        const user = await User.findById(decoded.userId).select('-password');
        if(!user) throw new Error("User not found!");
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}