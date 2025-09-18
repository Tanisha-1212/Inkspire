// upload.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // from your .env
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Setup storage for Multer to directly upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blogApp", // all uploads will go inside a folder named blogApp
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // optional resize
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
