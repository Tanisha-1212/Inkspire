const User = require('../models/User');
const Blog = require('../models/Blog');

exports.getUserProfile  = async (req, res)=>{
    try{
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");

    if(!user){
        return res.status(401).json({message: "User not found"});
    }

    res.status(200).json({user});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.updateProfile = async(req, res) => {
    try{
        const userId = req.user.id;

        const {username, profilePic, bio} = req.body;

        const updatedData = {}
        if(username) updatedData.username = username;
        if(profilePic) updatedData.profilePic = profilePic;
        if(bio) updatedData.bio = bio;

        const user = await User.findByIdAndUpdate(userId, {$set : updatedData}, {new: true, runValidators: true}).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({user});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.followUser = async(req, res) =>{
    try{
    const userId  = req.user.id;
    const targetUserId = req.params.id;

    if(userId === targetUserId){
        return res.status(400).json({message: "YOu cannot follow yourself"});
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if(!user || !targetUser){
        return res.status(404).json({message: "User not found"});
    }

    if(user.following.includes(targetUserId)){
        return res.status(400).json({message: "You already follow this user"});
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({message: `You are now follwoing ${targetUser.username}`});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.unfollowUser = async(req, res) => {
    try{
        const userId = req.user.id;
        const targetUserId = req.params.id;

        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if(!user || !targetUser){
            return res.status(404).json({message: "User not found"});
        }

        if(!user.following.includes(targetUserId)){
            return res.status(400).json({message: "You are not following this user"});
        }

        user.following.pull(targetUserId);
        targetUser.followers.pull(userId);

        await user.save();
        await targetUser.save();

        res.status(200).json({message: `You unfollowed ${targetUser.username}`});

    }catch(err){
        return res.status(500).json({message: "Server Error", error: err.message});
    }
}


exports.getFollowers = async (req, res) => {
    try{
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password").populate("followers", "username profilePic");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({followers: user.followers});
    }
    catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.getFollowing = async(req, res) =>{
    try{
        const userId = req.params.id;

        const user = await User.findById(userId).select("-password").populate("following", "username profilePic");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({following: user.following});

    }catch(err){
        return res.status(500).json({message: "Server error", error: err.message});
    }
}

exports.getBlogByUser = async(req, res)=>{
    try{
        const userId = req.user.id;

        const blogs = await Blog.find({creator: userId}).populate("likes comments");
        
        res.status(200).json({blogs});
    }
    catch(err){
        return res.status(500).json({message: "Server Error", error : err.message});
    }
}