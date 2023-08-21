const Notification = require("../models/modificationModel");

const addNotifications = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.send({
      sucess: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({
      createdAt: -1,
    });

    res.send({
      sucess: true,
      message: notifications,
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const deleteNotifications = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.send({
      sucess: true,
      message: "notification  deleted successfully",
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

module.exports = {
  addNotifications,
  getAllNotifications,
  deleteNotifications,
  readAllNotifications,
};
