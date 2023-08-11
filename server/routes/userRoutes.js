const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  getCurrentUser,
  getAllUser,
  UpdateUserStatus,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/get-current-user", authMiddleware, getCurrentUser);
router.get("/get-users", authMiddleware, getAllUser);
router.put("/update-user-status/:id", authMiddleware, UpdateUserStatus);

module.exports = router;
