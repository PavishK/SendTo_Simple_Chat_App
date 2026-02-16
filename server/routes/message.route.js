import express from "express";
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";

const route = express.Router();

route.get('/users', protectedRoute, getUsers);
route.get('/:id', protectedRoute, getMessages);
route.post('/send/:id', protectedRoute, sendMessage);

export default route;