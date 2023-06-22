const multer = require('multer');
const path = require('path');

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null,'uploads/')},
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the original filename
  }
});

// Create multer upload configuration
const upload = multer({ storage: storage });

module.exports = upload;
