const express = require("express");
const router = express.Router();
const { UserSignup, UserLogin } = require("../controllers/User.controller");
const { authenticateTokens } = require("../middleware/User.auth");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

router.post("/user/signup", UserSignup);
router.post("/user/login", UserLogin);

router.post("/token/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find user by ID in decoded payload
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );

    res.json({ accessToken });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({ message: "Refresh token has expired" });
    }
    return res.status(403).json({ message: "Invalid refresh token" });
  }
});

router.post("/user/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
