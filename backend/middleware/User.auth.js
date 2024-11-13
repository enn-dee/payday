const jwt = require("jsonwebtoken");
const { z } = require("zod");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET ; 

const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const authenticate = async (req, res, next) => {
  try {
   
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const trimToken = token.split(" ")[1];

    const decoded = jwt.verify(trimToken, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;

    const validation = UserSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid Inputs", errors: validation.error.errors });
    }

    const { username, password } = validation.data;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
