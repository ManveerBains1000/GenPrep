import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken";
/**
 * @Name register controller
 * @Description Controller for registering a new user, excepting username,email and password in the request body.
 * @Access Public
 */

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide username, email and password",
      });
    }

    const isUserAlreadyRegistered = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyRegistered) {
      // User already registered
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * @name login
 * @description Controller for logging in a user, excepting email and password in the request body.
 * @access Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const isUserRegistered = await User.findOne({ email });

    if (!isUserRegistered) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserRegistered.password,
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: isUserRegistered._id,
        username: isUserRegistered.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: isUserRegistered._id,
        username: isUserRegistered.username,
        email: isUserRegistered.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


