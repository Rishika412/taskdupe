const express = require("express");
const router = express.Router();

const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");

// User Management Routes

// Get all users (Admin only)
router.get("/", protect, adminOnly, getUsers);

// Get a specific user by ID (accessible to the logged-in user)
router.get("/:id", protect, getUserById);


module.exports = router;
