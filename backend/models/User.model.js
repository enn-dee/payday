const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
  },
  lastName: {
    type: String,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

// UserSchema.virtual("username").get(function () {
//   unique: true;
//   const random = Math.floor(Math.random() * 3);
//   return this.firstName[random] + this.lastName;
// });
const User = mongoose.model("User", UserSchema);

module.exports = User;
