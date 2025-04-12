import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async (retries = 5, delay = 2000) => {
  // Return the cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    cached.promise = (async () => {
      for (let i = 0; i < retries; i++) {
        try {
          const connection = await mongoose.connect(process.env.MONGO_URL);
          console.log("MongoDB connected.");
          return connection;
        } catch (error) {
          console.error(`MongoDB connection attempt ${i + 1} failed:`, error);
          if (i < retries - 1) {
            console.log(`Retrying in ${delay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
          } else {
            cached.promise = null; // Reset the promise on final failure
            throw error; // Rethrow the error to handle it upstream
          }
        }
      }
    })();
  }

  // Wait for the connection promise to resolve
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;