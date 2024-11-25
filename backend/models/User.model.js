const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters long"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username });
};

UserSchema.methods.validatePassword = async function (password, bcrypt) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.index({ username: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
