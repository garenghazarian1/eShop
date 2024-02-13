import express from "express";
import { handleRegister, handleLogin, getAllUsers } from "../controllers/authController.js";
import multer from "multer";
import path from "path"; // Import path module to handle file paths

// Configure multer's disk storage
const storage = multer.diskStorage({
    // Set the destination where uploaded files should be stored
    destination: (req, file, cb) => {
        // First parameter is null to indicate no error
        // Second parameter 'uploads/' is the destination directory for uploaded files
        cb(null, 'uploads/');
    },
    // Set the naming convention for uploaded files
    filename: (req, file, cb) => {
        // Create a unique filename using the current timestamp and a random number to avoid name conflicts
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Use path.extname to get the original file extension
        // Combine field name, unique suffix, and original extension for the final filename
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer with the custom storage engine
const upload = multer({ storage: storage });

const authRouter = express.Router();

// Define the registration route with multer middleware to handle 'userImage' field uploads
authRouter.post('/register', upload.single('userImage'), handleRegister);

// Define the login route without any multer middleware as file upload isn't required
authRouter.post('/login', handleLogin);

// Define a route to fetch all users, no file handling required here either
authRouter.get('/all-users', getAllUsers);

export default authRouter;
