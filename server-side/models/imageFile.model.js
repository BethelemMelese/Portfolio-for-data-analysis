const mongoose = require("mongoose");

// Create a schema and model for storing files
const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      require: true,
    },
    imageFile: {
      data: Buffer,
      contentType: String,
      filename: String,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("ImageFile", fileSchema);
