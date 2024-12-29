const { z } = require("zod");
const Account = require("../models/Account.model");

const accountSchema = z.object({
  balance: z
    .number()
    .min(500, { message: "Minimum balance of 500 credits required." }),
});

const depositWithdrawSchema = z.object({
  amount: z.number().min(50, { message: "Enter a valid amount (amount > 50)" }),
});
const UserAccount = async (user) => {
  return await Account.findOne({ userId: user.id });
};

// ========================================== //
const checkBalance = async (req, res) => {
  try {
    const user = req.user;
    const userAccount = await UserAccount(user);

    if (!userAccount) {
      return res
        .status(404)
        .json({ message: "No account exists for this user. Please create an account to proceed." });
    }

    res.status(200).json({
      status: "Success",
      balance: userAccount.balance,
    });
  } catch (err) {
    console.error("Error in checkBalance:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ========================================== //
const createAccount = async (user, balance) => {
  try {
    const existingAccount = await Account.findOne({ userId: user.id });
    if (existingAccount) {
      return null; 
    }

    const initialBalance = balance || 500; 

    const newAccount = new Account({
      userId: user.id,
      balance: initialBalance,
    });

    await newAccount.save();
    return newAccount;
  } catch (err) {
    console.error("Error in createAccount:", err.message);
    return null;
  }
};


// ========================================== //
const depositToAccount = async (req, res) => {
  try {
    const user = req.user;

    const validation = depositWithdrawSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const { amount } = validation.data;

    const updatedAccount = await Account.findOneAndUpdate(
      { userId: user.id },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!updatedAccount) {
      return res
        .status(404)
        .json({ message: "Account not found, deposit failed." });
    }

    res.status(200).json({
      status: "Success",
      message: "Amount deposited.",
      balance: updatedAccount.balance,
    });
  } catch (err) {
    console.error("Error in depositToAccount:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
// ========================================== //

const withdrawFromAccount = async (req, res) => {
  try {
    const user = req.user;
    const userAccount = await UserAccount(user);

    if (!userAccount) {
      return res
        .status(404)
        .json({ message: "Account not found, please create an account." });
    }

    const validation = depositWithdrawSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const { amount } = validation.data;

    if (userAccount.balance < amount) {
      return res
        .status(400)
        .json({ message: "Insufficient balance for this withdrawal." });
    }

    const updatedAccount = await Account.findOneAndUpdate(
      { userId: user.id },
      { $inc: { balance: -amount } },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      message: "Amount withdrawn successfully.",
      balance: updatedAccount.balance,
    });
  } catch (err) {
    console.error("Error in withdrawFromAccount:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ========================================== //
module.exports = {
  checkBalance,
  createAccount,
  depositToAccount,
  withdrawFromAccount,
  UserAccount,
};
