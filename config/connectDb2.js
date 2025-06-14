import mongoose from "mongoose";

let connection2;

const connectDb2 = async () => {
  if (connection2) {
    return connection2;
  }
  try {
    connection2 = await mongoose.createConnection(process.env.MONGO_URL_NEW);
    console.log("MongoDB 2 connected.");
    return connection2;
  } catch (error) {
    console.error(`${error} MongoDB 2 connection failed`);
  }
};

export default connectDb2;
