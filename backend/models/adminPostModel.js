import mongoose from "mongoose";

const { Schema } = mongoose;

// const commentSchema = new Schema({
//     text: { type: String, required: true, trim: true },
//     user: { type: String, required: true, trim: true }, // Consider referencing a User model if you have one
//     createdAt: { type: Date, default: Date.now }
// });

const adminPostSchema = new Schema({
    productName: { type: String, required: false, trim: true },
    cultureType: { type: String, required: false, trim: true }, // Added field
    productPrice: { type: Number, required: false, trim: true }, // Changed type to Number for pricing
    productImage: { type: String, required: false }, // Path to the image stored locally
    imagePublicId: { type: String, required: false },
    // likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the post. Adjust 'User' to your User model
    // comments: [commentSchema], // Embedded sub-document for comments
    adminName: { type: Schema.Types.ObjectId, ref: 'Admin'} // Reference to the Admin model
}, { timestamps: true });

const AdminPost = mongoose.model('AdminPost', adminPostSchema);

export default AdminPost;
