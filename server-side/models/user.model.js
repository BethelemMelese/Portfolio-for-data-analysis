const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please insert First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please insert Last Name"],
    },
    email: {
      type: String,
      required: [true, "Please insert Email Address"],
      Unique,
    },
    phone: {
      type: String,
      required: [true, "Please insert Phone Number"],
      Unique,
    },
    passwordHash: {
      type: String,
      required: true,
      Unique,
    },
    profession: {
      type: String,
      required: [true, "please insert Your Current profession"],
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
