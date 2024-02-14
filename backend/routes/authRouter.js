import express from "express";
import { handleRegister, handleLogin, getAllUsers } from "../controllers/authController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const authRouter = express.Router();

authRouter.post('/register', upload.single('userImage'), handleRegister);
authRouter.post('/login', handleLogin);
authRouter.get('/all-users', getAllUsers);

export default authRouter;
