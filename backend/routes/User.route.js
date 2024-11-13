const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { UserSignup, UserLogin } = require("../controllers/User.controller");
const authenticate = require("../middleware/User.auth");

router.post("/user/signup",UserSignup);
router.post("/user/login",authenticate,UserLogin);

module.exports = router;