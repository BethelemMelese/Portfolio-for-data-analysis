const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    resumeLink: {
      type: String,
      require: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
