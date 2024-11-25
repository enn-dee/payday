const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

 async function generateRefreshToken(user) {
  if (typeof user !== "object") {
    throw new Error("User is not an object");
  }
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  try {
    await User.findOneAndUpdate(
      { _id: user.id },
      { $set: { refreshToken: refreshToken } },
      { new: true }
    );
    console.log("Refresh token saved successfully");
  } catch (error) {
    console.error("Error saving refresh token:", error);
    throw new Error("Failed to save refresh token");
  }
  return refreshToken;
}

module.exports = { generateRefreshToken };
