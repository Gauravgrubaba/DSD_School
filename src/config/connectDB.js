import mongoose from 'mongoose';

const connectDB = async (URI) => {
    try {
        await mongoose.connect(URI);
        console.log(`MongoDB connection successful: ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export default connectDB;