import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";
import { io, receiversSocketId } from '../lib/socket.js';

export const getUsers = async(req, res) => {
    try {
        const users = await User.find({ _id: {$ne: req.user._id}}).select('-password');
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId},
                { senderId: receiverId, receiverId: senderId}
            ]
        });
        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const sendMessage = async(req, res) => {
    try {
        const { text, image} = req.body;
        const  { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;

        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        const newMsg = await newMessage.save();

        const receiverSocketId = receiversSocketId(receiverId);

        if(receiverSocketId) io.to(receiverSocketId).emit('message', newMessage);

        return res.status(201).json({message: "Message saved!", newMsg });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}