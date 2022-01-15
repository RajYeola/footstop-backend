const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUser = async (req, res) => {
  try {
    const {userID} = req.user;
    const user = await User.findById(userID).select("_id email name")
    res.json({success: true, user})
  } catch (error) {
    res.json({success: false, message: "Error fetching user data", errorMessage: error.message})
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.json({ success: true, users });
  } catch (error) {
    res.json({
      success: false,
      message: "Error retrieving users",
      errorMessage: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    await newUser.save();

    res.status(200).json({ success: true, newUser, token });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user credentials" });
    }

    if (existingUser && isPasswordCorrect) {
      const token = jwt.sign({ id: existingUser._id }, process.env.SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({ success: true, result: existingUser, token });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      errorMessage: error.message,
    });
  }
};

module.exports = { getUser, signinUser, createNewUser };
