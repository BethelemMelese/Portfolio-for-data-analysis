const mongoose = require("mongoose");

const ContactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
    reviewStatus: {
      type: String,
      require: false,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Contact", ContactsSchema);
