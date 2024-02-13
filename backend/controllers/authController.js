import Auth from "../models/authModel.js";
import bcrypt from "bcrypt";
import {salt, jsonwebtokenUser} from "../library/env-vars.js";
//import  jwt from "jsonwebtoken";


// REGISTER FUNCTION ***********************************
export const handleRegister = async (req, res) => {
       
    try {
        const content = req.body
        console.log("🚀 ~ handleRegister ~ content:", content)// get it using thunder server
        const hash = await bcrypt.hash(content.password, parseInt(salt));
        console.log("🚀 ~ handleRegister ~ hash:", hash)// get it using thunder server
        content.password = hash;  // add the password to the request body for use in the next function

            // Include image information if available
            if (req.file) { // `req.file` is populated by `multer`
                content.image = req.file.path; // URL to the uploaded image
                content.imagePublicId = req.file.filename; // Public ID assigned by Cloudinary
            }

        const auth = await Auth.create(content);
        console.log("handleRegister", content);
        res.status(201).json({success: true, auth})
    } catch (error) {
        console.log("error in register",error.message);
        res.status(500).send({success:false, error: error.message})
    }};

// LOGIN FUNCTION ***********************************
export const handleLogin = async (req, res) => {
    try {
        const user = await Auth.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (!user || !isMatch) {
            return res.status(401).json({ success: false, error: "email or password not correct" });
        }
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            //const token = jwt.sign({id: user._id, name:user.name},jsonwebtokenUser, {expiresIn: "30d"})
           // console.log("🚀 ~ handleLogin ~ token:", token);
            //res.cookie("e_shop_nur", token);   //add cookie with token
            // res.cookie("e_shop_nur", token, {
            //     httpOnly: true,
            //     // secure: process.env.production,
            //     // sameSite: process.env.production ? "None" : "Lax",
            //   });
        res.json({success: true, message: "Login successful",user});
        console.log(user);
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ success: false, error: "An error occurred during the login process" });
    }
};

// GET A USER BY ID ***********************************
// GET ALL USERS FUNCTION ***********************************
export const getAllUsers = async (req, res) => {
    try {
        const users = await Auth.find({});
        if (!users.length) {
            return res.status(404).json({ success: false, error: "No users found" });
        }
        //console.log(users);
        res.json({ success: true, users });
    } catch (error) {
        console.log("Error in getting all users", error.message);
        res.status(500).json({ success: false, error: "An error occurred while fetching users" });
    }
};
