const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/authMiddleware");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const { getUserProfile } = require("../controllers/authController");
const { updateUserProfile } = require("../controllers/authController");
const upload = require("../middlewares/uploadMiddleware")

// Auth Routes

router.post("/register", registerUser);// Register User
router.post("/login", loginUser);// Login User
router.get("/profile", protect, getUserProfile);// Get User Profile
router.put("/profile", protect, updateUserProfile);// Update Profile
 
router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(200).json({ imageUrl });
});

module.exports = router;