import express from "express";
import {handleRegister, handleLogin, getAllAdmins } from "../controllers/adminController.js";
const adminRouter =  express.Router();

adminRouter.post('/register', handleRegister);
adminRouter.post('/login', handleLogin);
adminRouter.get('/all-users', getAllAdmins);

export default adminRouter;