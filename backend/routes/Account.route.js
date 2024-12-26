const {
  checkBalance,
  createAccount,
  depositToAccount,
  withdrawFromAccount,
} = require("../controllers/Account.controller");
const { authenticateTokens } = require("../middleware/User.auth");

const AccountRouter = require("express").Router();

AccountRouter.get("/account/balance", authenticateTokens, checkBalance);

AccountRouter.post("/account/deposit", authenticateTokens, depositToAccount);

AccountRouter.get("/accound/withdraw", authenticateTokens, withdrawFromAccount);

module.exports = { AccountRouter };
