const { z } = require("zod");
const { UserAccount } = require("./Account.controller");
const Account = require("../models/Account.model");
const mongoose = require("mongoose");

const TransferSchema = z.object({
  id: z.string().nonempty({ message: "Recipient ID is required." }),
  amount: z
    .number()
    .positive({ message: "Amount must be a positive number." })
    .min(50, {
      message: "Enter a valid amount (amount >= 50)",
    }),
});
//==============================================//
const Transfer = async (req, res) => {
  const session = await mongoose.startSession();
  /*If any of query fail, mongo will revert(won't execute*/
  session.startTransaction();

  try {
    const user = req.user;
    const userAccount = await UserAccount(user);

    if (!userAccount) {
      return res
        .status(404)
        .json({ message: "Account not found. Please create one." });
    }

    const validation = TransferSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { id, amount } = validation.data;

    if (userAccount.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance to complete the transfer.",
      });
    }

    const recipientAccount = await Account.findOne({
      userId: new mongoose.Types.ObjectId(id),
    }).session(session);
    if (!recipientAccount) {
      return res.status(404).json({ message: "Recipient account not found." });
    }
    if (id == userAccount.userId) {
      return res
        .status(404)
        .json({ message: "Can't transfer to your own account." });
    }
    userAccount.balance -= amount;
    await userAccount.save({ session });

    recipientAccount.balance += amount;
    await recipientAccount.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      status: "Success",
      message: "Amount transferred successfully.",
    });
  } catch (err) {
    //abort db session
    await session.abortTransaction();
    console.error("Error in Transfer:", err.message);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    session.endSession();
  }
};

module.exports = {
  Transfer,
};
