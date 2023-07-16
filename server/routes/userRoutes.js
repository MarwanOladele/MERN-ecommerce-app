const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  getCurrentUser,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/get-current-user", authMiddleware, getCurrentUser);

module.exports = router;
