const mongoose = require("mongoose");

const blogCategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Please insert Category Name"],
    },
    categoryDescription: {
      type: String,
      required: [true, "Please insert Category Description"],
    },
    categoryImage: {
      type: String,
      required: [true, "Please insert the Category Image"],
    },
    blogItemId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogItem",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogCategory", blogCategorySchema);
