const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // save the user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ sucess: true, message: "User created successfully" });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not Found");
    }

    // check if the user is active
    if (user.status !== 'active') {
      throw new Error("User Account is Blocked, Please contact the administrator");
    }

    // validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      throw new Error("Invalid password");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.send({
      sucess: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      sucess: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send({
      sucess: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

const UpdateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await User.findByIdAndUpdate(req.params.id, { status });
    res.send({
      sucess: true,
      message: "User Update successfully",
    });
  } catch (error) {
    res.send({ sucess: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  login,
  getCurrentUser,
  getAllUser,
  UpdateUserStatus,
};
