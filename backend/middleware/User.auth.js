const jwt = require("jsonwebtoken");
const { z } = require("zod");

const authenticateTokens = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Access token not provided" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication Error:", err);

    return res.status(403).json({ message: "Invalid or expired access token" });
  }
};

// check for username , password
const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

// const authenticateCredentials = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const validation = userSchema.safeParse(user);
//     if (!validation) {
//       return res
//         .status(400)
//         .json({ message: "Invalid inputs", errors: validation.error.erros });
//     }
//     const { username, password } = validation?.data;
//     const isUser = await User.findOne({ username });
//     if (!isUser) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, isUser.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     next();
//   } catch (err) {
//     console.error("Authentication Error:", err);
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

module.exports = {
  authenticateTokens,
};
