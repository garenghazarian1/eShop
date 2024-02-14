import mongoose from "mongoose";

const { Schema } = mongoose;


const adminPostSchema = new Schema({
    productName: { type: String, required: false, trim: true },
    cultureType: { type: String, required: false, trim: true }, // Added field
    productPrice: { type: Number, required: false, trim: true }, // Changed type to Number for pricing
    productImage: { type: String}, // Path to the image stored locally
    imagePublicId: { type: String, required: false },
    adminName: { type: Schema.Types.ObjectId, ref: 'Admin'} // Reference to the Admin model
}, { timestamps: true });

const AdminPost = mongoose.model('AdminPost', adminPostSchema);

export default AdminPost;
