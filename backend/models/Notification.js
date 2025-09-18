const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // the user who will receive the notification
    },
    type: {
      type: String,
      enum: ['like', 'comment', 'follow'],
      required: true,
    },
    fromUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true, // who triggered the notification
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog', // optional, only if related to a blog
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment', // optional, only if related to a comment
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
