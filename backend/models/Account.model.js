const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    balance: {
      type: Number,
      required: true,
      default: 500,
    },
  },
  { timestamps: { updatedAt:true} }
);

AccountSchema.pre("save", function (next) {
  if (this.balance < 400) {
    const err = new Error("Minimum of 500 balance required");
    return next(err);
  }
  console.log("Account info saved");
  next();
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
