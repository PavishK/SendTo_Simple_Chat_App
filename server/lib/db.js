import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then( () =>console.log('\t\x1b[32m✓ MongoDB connected successfully!\x1b[0m'))
    .catch( err => console.log('\t\x1b[31m✕ Error connecting to MongoDB!\x1b[0m'))
}