const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generatetoken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const isuser = await User.findOne({ name });
    if (isuser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await User.create({
      name,
      password: hashedpassword,
    });
    return res.status(201).json({
      success: true,
      user: newuser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "User not registered",
      error: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const isuser = await User.findOne({ name });
    if (!isuser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const ispass = await bcrypt.compare(password, isuser.password);
    if (!ispass) {
      return res.status(409).json({
        success: false,
        message: "wrong password",
      });
    }

    const token = await generatetoken({
      userId: isuser._id,
      name: isuser.name,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        name: isuser.name,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: e.message,
    });
  }
};

module.exports = { register, login };
