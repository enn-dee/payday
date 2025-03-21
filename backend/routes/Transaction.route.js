const { Transfer, getAllAccounts } = require("../controllers/Transaction.controller");
const { authenticateTokens } = require("../middleware/User.auth");

const TransacRoute = require("express").Router();

TransacRoute.post("/transfer", authenticateTokens, Transfer);
TransacRoute.get("/users", authenticateTokens,getAllAccounts);

module.exports = {
  TransacRoute,
};
