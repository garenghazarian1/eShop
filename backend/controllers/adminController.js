import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import {salt, jsonwebtokenAdmin} from "../library/env-vars.js";
//import  jwt from "jsonwebtoken";


// REGISTER FUNCTION ***********************************
export const handleRegister = async (req, res) => {
       
    try {
        const hash = await bcrypt.hash(req.body.password, parseInt(salt));
        //console.log("🚀 ~ handleRegister ~ hash:", hash)
        req.body.password = hash;  // add the password to the request body for use in the next function
        const admin = new Admin(req.body)
        //console.log("handleRegister", req.body);
        await admin.save();
        res.status(201).json({success: true, admin})
    } catch (error) {
        console.log("error in register",error.message);
        res.status(500).json({success:false, error: error.message})
    }};

// LOGIN FUNCTION ***********************************
export const handleLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        const isMatch = await bcrypt.compare(req.body.password, admin.password);
        
        if (!admin || !isMatch) {
            return res.status(401).json({ success: false, error: "email or password not correct" });
        }
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            // const token = jwt.sign({id: admin._id},jsonwebtokenAdmin, {expiresIn: "30d"})
            // console.log("🚀 ~ handleLogin ~ token:", token);
            // res.cookie("e_shop_nur", token);   //add cookie with token
        res.json({success: true, message: "Login successful",admin});
        console.log(admin);
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ success: false, error: "An error occurred during the login process" });
    }
};

// GET A USER BY ID ***********************************
// GET ALL USERS FUNCTION ***********************************
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}).select("name");
        if (!admins.length) {
            return res.status(404).json({ success: false, error: "No admins found" });
        }
        res.json({ success: true, admins });
    } catch (error) {
        console.log("Error in getting all users", error.message);
        res.status(500).json({ success: false, error: "An error occurred while fetching users" });
    }
};
