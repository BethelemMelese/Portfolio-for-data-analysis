const mongoose = require("mongoose");

const blogItemSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please insert the Blog Item"],
    },
    Author: {
      type: String,
      required: true,
    },
    PublishedDate: {
      type: Date,
      required: true,
    },
    mainContent: {
      type: String,
      required: true,
    },
    blogCategoryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("BlogItem", blogItemSchema);
