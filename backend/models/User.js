const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, // URL or file path
      default: '',  // optional default
    },
    bio: {
      type: String,
      default: '',
      maxlength: 200,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog', // assuming you have a Blog model
      },
    ],
    likedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment', // assuming you have a Comment model
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('User', userSchema);
