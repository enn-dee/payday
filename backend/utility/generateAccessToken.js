const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    try{
        if (typeof user === "object") {
            return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15m",
            });
        } else {
            return null;
        }
    }catch(error){
        console.log("Error in generateAccessToken", error);
        return null;
    }
}

module.exports = { generateAccessToken };
