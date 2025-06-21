import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB 1 connected.");
  } catch (error) {
    console.error(`${error} MongoDB connection failed`);
  }
};

export default connectDb;
