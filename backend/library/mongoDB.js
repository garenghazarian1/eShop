
import mongoose from 'mongoose';
import { uri, dbName } from './env-vars.js'; // Adjust the path based on your project structure

const connectDB = async () => {
  try {
    await mongoose.connect(uri,  );
    console.log(`MongoDB connected successfully ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
