const mongoose = require('mongoose');

let isConnected; // Track the connection status

const connectDb = async () => {
    if (isConnected) {
        console.log("MongoDB is already connected.");
        return; // If already connected, exit the function
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 400, // Limit connections
        });
        isConnected = true; // Set the connection status to true
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDb;