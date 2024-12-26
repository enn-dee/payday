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
        .json({ message: "Account not found, maybe create one." });
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
const createAccount = async (user,balance) => {
  try {
    // const user = req.user;

    const existingAccount = await Account.findOne({ userId: user.id });
    if (existingAccount) {
      // return res.status(400).json({ message: "You already have an account." });
      return null;
    }

    // const validation = accountSchema.safeParse(req.body);
    // !validation.success
    if (!balance) {
      // return res.status(400).json({ errors: validation.error.errors });
      return null;
      
    }

    // const { balance } = validation.data;

    const newAccount = new Account({
      userId: user.id,
      balance,
    });
    await newAccount.save();

    // res.status(201).json({
    //   status: "Success",
    //   message: "Account created successfully.",
    //   account: { id: newAccount._id, balance: newAccount.balance },
    // });
    return newAccount;
  } catch (err) {
    // res.status(500).json({ error: "Internal server error" });
    console.log("err in create acc: ", err.message)
    return err;
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
        .json({ message: "Account not found, maybe create one." });
    }
    const validation = depositWithdrawSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const { amount } = validation.data;
    const updatedAccount = await Account.findOneAndUpdate(
      { userId: user.id },
      { $inc: { balance: -amount } },
      { new: true }
    );
    if (!updatedAccount) {
      return res
        .status(404)
        .json({ message: "Account not found, deposit failed." });
    }
    res.status(200).json({
      status: "Success",
      message: "Amount withdraw.",
      balance: "Availabe balance: " + updatedAccount.balance,
    });
  } catch (err) {
    console.error("Error in withdrawBalance:", err.message);
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
