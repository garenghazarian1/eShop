
import express from "express";
import morgan from "morgan";
import { clientPort,port } from './library/env-vars.js'
import connectDB from './library/mongoDB.js'
import cors from 'cors';


//import uploadCloud from './middlewares/multercloudinary.js';
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import adminPostRouter from "./routes/adminPostRouter.js"


const app = express();
connectDB();

app.use(morgan('dev'));
app.use(cors({origin: clientPort}));
console.log("🚀 ~ clientPort:", clientPort)
app.use(express.json());


app.use("/uploads", express.static("uploads"));
app.use("/uploadsProducts", express.static("uploadsProducts"));

  
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
