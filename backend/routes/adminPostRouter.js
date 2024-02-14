import express from "express";
import {handleAdminNewPost, handleAdminGetAllPosts, handleAdminDeletePost,handleAdminEditPost } from "../controllers/adminPostsController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploadsProducts/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const uploadsProducts = multer({ storage: storage});

const adminPostRouter =  express.Router();

adminPostRouter.post('/add', uploadsProducts.single("productImage"), handleAdminNewPost);
adminPostRouter.get('/all-posts', handleAdminGetAllPosts);
adminPostRouter.delete('/delete', handleAdminDeletePost);
adminPostRouter.put('/edit', handleAdminEditPost);

export default adminPostRouter;