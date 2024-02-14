import AdminPost from "../models/adminPostModel.js";

// ADD PRODUCT************************************************
export const handleAdminNewPost = async (req, res) => {
    try {
        console.log("add prod, body is", req.body)
        console.log("add prod, file is", req.file)
        if (req.file) req.body.productImage = req.file.filepath
        const newProduct = await(await  AdminPost.create(req.body)).populate({path: "adminName"});
        res.json({success: true, post: newProduct});
    } catch (error) {
        console.error("Error in adding new post:", error);
        res.status(500).json({ success: false, message: "Failed to add post", error: error.message });
    }
};

// Function to handle retrieving all posts
export const handleAdminGetAllPosts = async (req, res) => {
    try {


        const posts = await AdminPost.find({});
        
        res.status(200).json({ success: true, posts });
        console.log("🚀 ~ handleAdminGetAllPosts ~ posts:", posts)
    } catch (error) {
        console.error("Error in getting all posts:", error);
        res.status(500).json({ success: false, message: "Failed to get posts", error: error.message });
    }
};

// Function to handle deleting a post
export const handleAdminDeletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        await AdminPost.findByIdAndDelete(postId);
        res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error in deleting post:", error);
        res.status(500).json({ success: false, message: "Failed to delete post", error: error.message });
    }
};

// Function to handle editing a post
export const handleAdminEditPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const updatedPost = await AdminPost.findByIdAndUpdate(postId, req.body, { new: true });
        res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error in updating post:", error);
        res.status(500).json({ success: false, message: "Failed to update post", error: error.message });
    }
};
