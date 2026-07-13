import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let dbConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    dbConnected = true;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    dbConnected = false;
    console.error(`MongoDB connection error: ${error.message}`);
    console.error("Server will continue without database. Auth features will be unavailable.");
  }
};

export { dbConnected };
export default connectDB;
