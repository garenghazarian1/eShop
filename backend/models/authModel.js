import mongoose from "mongoose";

const { Schema } = mongoose;
const authSchema = new Schema({
    name: { type: String, required: true, trim: true },
    age: Number,
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    image: {type: String, required: false },
    imagePublicId: { type: String, required: false },
}, { timestamps: true }); // creates createdAt and updatedAt fields

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
