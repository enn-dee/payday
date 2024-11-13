const express = require("express");
const { z } = require("zod");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
  username: z.string().min(3, "Username should be at least 3 characters long"),
});

const UserSignup = async (req, res) => {
  try {
    const body = req.body;
    const validation = UserSchema.safeParse(body);

    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Inputs", errors: validation.error.errors });
    }

    const { firstName, lastName, password, username } = validation.data;

    const isUser = await User.findOne({ username });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ firstName, lastName, password: hashedPassword, username });
    await user.save();

    const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const UserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { UserSignup, UserLogin };
