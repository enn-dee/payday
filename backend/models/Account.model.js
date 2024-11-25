const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
    required: true,
    // default:0
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
