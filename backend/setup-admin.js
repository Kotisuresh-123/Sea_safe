import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dotenv.config();

const UserSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", UserSchema);

const makeAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`No user found with email: ${email}`);
      process.exit(1);
    }

    await User.updateOne({ email }, { $set: { role: "admin" } });
    console.log(`User "${user.name}" (${email}) is now an ADMIN`);

    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

const email = process.argv[2];
if (!email) {
  console.log("Usage: node setup-admin.js your@email.com");
  process.exit(1);
}

makeAdmin(email);
