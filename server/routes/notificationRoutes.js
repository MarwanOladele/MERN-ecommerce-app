const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  addNotifications,
  getAllNotifications,
  deleteNotifications,
} = require("../controller/notificationController");

router.post("/notify-users", authMiddleware, addNotifications);
router.get("/get-all-notifications", authMiddleware, getAllNotifications);
router.delete("/delete-notification/:id", authMiddleware, deleteNotifications);
router.put("/read-all-notifications", authMiddleware, deleteNotifications);

module.exports = router;
