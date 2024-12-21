const { Transfer } = require("../controllers/Transaction.controller");
const { authenticateTokens } = require("../middleware/User.auth");

const TransacRoute = require("express").Router();

TransacRoute.post("/transfer", authenticateTokens, Transfer);

module.exports = {
  TransacRoute,
};
