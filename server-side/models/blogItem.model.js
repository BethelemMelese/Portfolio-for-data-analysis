const mongoose = require("mongoose");

const blogItemSchema = mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: [true, "Please insert the Blog Item"],
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    mainContent: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: [true, "Please insert the blog Image"],
    },
    blogCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: false,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("BlogItem", blogItemSchema);
