const Notification = require("../models/Notification");


exports.createNotifications = async(req, res) => {
    try {
        const receiverId = req.user._id;
        const {type, fromUserId, blogId, commentId} = req.body;

        if(!type || !fromUserId || !receiverId){
            return res.status(400).json({message: "Type, fromUserId, and receiverId are required"});
        }

        const notification = await Notification.create({
            user: receiverId,
            type,
            fromUser: fromUserId,
            blog: blogId || null,
            comment: commentId || null,
        })

        await notification.populate("fromUser", "username profilePic");

        res.status(201).json({messgae: "Notification created", notification});
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
};


exports.getNotifications = async(req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({user: userId})
        .populate("fromUser", "username profilePic")
        .populate("blog", "title")
        .populate("comment", "text")
        .sort({createdAt: -1});

        res.status(200).json({notifications})
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
};

exports.markAsRead = async(req, res) => {
    try {
        const userId = req.user._id;

        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);

        if(!notification){
            return res.status(404).json({message: "Notification not found"});
        }

        if(notification.user.toString() !== userId){
            return res.status(403).json({message: "Not authorized to mark this notification as read"});
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({message: "Notification marks as read", notification});
    } catch (err) {
        return res.status(500).json({message: "Server error", error: err.message});
    }
};