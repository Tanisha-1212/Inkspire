const multer = require("multer");

const storage = multer.memoryStorage();
const fileFilter = (req, res, cb) => {
    if(fileFilter.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
}

const upload = multer({storage, fileFilter});

module.exports = upload;