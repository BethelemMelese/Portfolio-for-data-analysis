const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please insert First Name"],
    },
    middleName: {
      type: String,
      required: [true, "Please insert MIddle Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please insert Last Name"],
    },
    fullName: {
      type: String,
      required: [true, "Please insert Full Name"],
    },
    email: {
      type: String,
      required: [true, "Please insert Email Address"],
    },
    phone: {
      type: String,
      required: [true, "Please insert Phone Number"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: [true, "please insert Your Current profession"],
    },
    profileImage: {
      data: Buffer,
      contentType: String,
    },
    token: {
      type: String,
      required: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
