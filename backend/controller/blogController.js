const Blog = require("../models/Blog");
const Like = require('../models/Like');

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;

    // If you're using Multer for multiple images:
    const pictures = req.files ? req.files.map(file => file.path) : [];

    if (!description || pictures.length === 0) {
      return res.status(400).json({ message: "Description and pictures are required" });
    }

    const blog = await Blog.create({
      title,
      description,
      pictures, // these are file paths
      tags: tags ? JSON.parse(tags) : [], // if frontend sends JSON-stringified tags
      category,
      creator: req.user.id,
      date: Date.now(),
      likes: [],
      comments: [],
    });

    res.status(201).json({ blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.getAllBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find()
            .populate("creator", "username profilePic")
            .populate("likedBy", "username profilePic")
            .populate("comments", "text creator");

        res.status(200).json({blogs})
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getBlogById = async (req, res)=>{
    try{
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId)
            .populate("creator", "username profilePic")
            .populate("likedBy", "username profilePic")
            .populate("comments", "text creator");

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        res.status(200).json({blog});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.updateBlog = async(req, res) => {
    try{
        const blogId = req.params.id;
        
        const {title, description, pictures, tags, category} = req.body;

        const updatedBlog = {};
        if(title) updatedBlog.title = title;
        if(description) updatedBlog.description = description;
        if(pictures) updatedBlog.pictures = pictures;
        if(tags) updatedBlog.tags = tags;
        if(category) updatedBlog.category = category;

        const blog = await Blog.findByIdAndUpdate(blogId, {$set: updatedBlog}, {new: true, runValidators: true});

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        res.status(200).json({blog});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.deleteBlog = async(req, res) => {
    try{
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        if(blog.creator.toString() != req.user.id){
            return res.status(403).json({message: "You are not authorized to delete the blog"})
        }

        await Blog.findByIdAndDelete(blogId);
        await Like.deleteMany({blog: blogId});

        res.status(200).json({message: "Blog deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
};


exports.likeBlog = async(req, res) => {
    try{
        const userId = req.user._id;
        const blogId = req.params.id;

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        if(blog.likedBy.includes(userId)){
            blog.likedBy.pull(userId);
            await blog.save();
            await Like.deleteOne({ user: userId, blog: blogId });
            return res.status(200).json({message: "Blog unliked", likesCount: blog.likedBy.length});
        } else{
            blog.likedBy.push(userId);
            await blog.save();
            await Like.create({ user: userId, blog: blogId });
            return res.status(200).json({message: "Blog liked", likesCount: blog.likedBy.length})
        }
    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.getBlogByFilter = async(req, res) => {
    try{
        const {category, tag} = req.body;

        const filter ={};
        if(category) filter.category = category;
        if(tag) filter.tag =  tag;

        const blogs = await Blog.find(filter)
        .populate("creator", "username profilePic")
        .populate("likedBy", "username profilePic")
        .populate("comments", "content creator");

        res.status(200).json({ blogs });
    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}


exports.getBlogLikes = async(req, res)=>{
    try {
        const blogId = req.params.id;

        const blog = awaitBlog.findById(blogId).populate("likedBy", "username profilePic");

        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        res.status(200).json({likes: blog.likedBy});
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message})
    }
}