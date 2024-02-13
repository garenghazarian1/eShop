import mongoose from "mongoose";

const { Schema } = mongoose;
const adminSchema = new Schema({
    name: { type: String, required: true, trim: true },
    age: Number,
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true }
}, { timestamps: true }); 

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
