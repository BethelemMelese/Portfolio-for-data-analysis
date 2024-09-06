const mongoose = require("mongoose");

// Create a schema and model for storing files
const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      require: true,
    },
    imageFile: {
      type: String,
      require: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("ImageFile", fileSchema);
