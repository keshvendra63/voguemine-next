import mongoose from 'mongoose';

const connectDb = async () => {
  // Return the cached connection if it exists

  // If no connection promise exists, create one
        try {
          const connection = await mongoose.connect(process.env.MONGO_URL);
          if(connection){
            console.log("MongoDB connected.");
          return connection;
          }
        } catch (error) {
          console.error(` ${error} MongoDB connection failed`);

        }
      
  

};

export default connectDb;