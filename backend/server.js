
import express from "express";
import morgan from "morgan";
import { clientPort,port } from './library/env-vars.js'
import connectDB from './library/mongoDB.js'
import cors from 'cors';
import upload from "./middlewares/middlewares.js";

//import uploadCloud from './middlewares/multercloudinary.js';
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import adminPostRouter from "./routes/adminPostRouter.js"
import uploadsProducts from "./middlewares/productsMiddleware.js";

const app = express();
connectDB();

app.use(morgan('dev'));
app.use(cors({origin: clientPort}));
console.log("🚀 ~ clientPort:", clientPort)
app.use(express.json());

// app.post('/upload', uploadCloud.single('file'), (req, res) => {
//     res.send({
//       message: 'File uploaded successfully',
//       fileInfo: req.file
//     });
//   });
app.use("/uploads", express.static("uploads"));
app.post('/uploads', upload.single('file'), (req, res) => {
  res.send({
    message: 'File uploaded successfully',
    fileInfo: req.file
  });
});

app.use("/uploadsProducts", express.static("uploadsProducts"));
app.post('/uploadsProducts', uploadsProducts.single('file'), (req, res) => {
  res.send({
    message: 'File uploaded successfully',
    fileInfo: req.file
  });
});
  
app.use("/user",  authRouter);
app.use("/admin", adminRouter);
app.use("/admin/posts", adminPostRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`); 
});
