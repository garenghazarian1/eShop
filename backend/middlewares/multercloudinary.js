import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Import CloudinaryStorage
import multer from 'multer';
import 'dotenv/config';

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2, // Use cloudinary.v2
  params: {
    folder: 'e-shop', // The folder name in Cloudinary
    format: async (req, file) => {
      // Extract the file extension from the mimetype
      const extension = file.mimetype.split('/')[1];
      return extension;
    },
    public_id: (req, file) => {
      // Use the current timestamp as the public ID
      return Date.now();
    },
  },
});

// Initialize Multer with Cloudinary storage
const uploadCloud = multer({ storage: storage });

export default uploadCloud;
