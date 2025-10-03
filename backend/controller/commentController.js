const Comment = require("../models/Comment");
const Blog = require("../models/Blog");

exports.addComment = async(req, res)=>{
    try {
        const userId = req.user._id;
        const blogId = req.params.id;
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Comment content is required"});
        }

        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        const comment = await Comment.create({
            content, 
            creator: userId,
            blog: blogId
        });
        

        blog.comments.push(comment._id);
        await blog.save();
        await comment.populate("creator", "username profilePic");
        res.status(201).json({comment});
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.deleteComment = async(req, res) =>{
    try {
        const userId = req.user._id;
        const commentId = req.params.id;

        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }

        if(comment.creator.toString() !== userId){
            return res.status(403).json({message: "Not authorized to delete this comment"});
        }

        await comment.deleteOne();

        await Blog.findByIdAndUpdate(comment.blog, { $pull : {comments: commentId}});

        res.status(200).json({message: "Comment deleted successfully"});
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
};


exports.getCommentByBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    
    const blog = await Blog.findById(blogId).populate({
      path: "comments",       // populate comments array
      populate: {
        path: "creator",         // populate the user who created each comment
        select: "username profilePic", // select only needed fields
      },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    
    res.status(200).json({ comments: blog.comments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.updateComment = async(req, res) =>{
    try {
        const userId = req.user._id;
        const commentId = req.params.id;
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Content is required"});
        }

        const comment = await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message: "Comment not found"});
        }

        if(comment.creator.toString !== userId){
            return res.status(403).json({message: "Not authorized to update this comment"});
        }

        comment.content = content;
        await comment.save();

        await comment.populate("creator", "username profilePic");

        res.status(200).json({ comment })
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
}