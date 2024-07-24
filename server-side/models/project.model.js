const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    project_Number: {
      type: Number,
    },
    project_Title: {
      type: String,
      required: [true, "Please insert the Project Title"],
    },
    project_Description: {
      type: String,
      required: [true, "Please insert the Project Description"],
    },
    project_Image: {
      data: Buffer,
      contentType: String,
    },
    sourceCodeLink: {
      type: String,
      required: [true, "Please insert the Source Code Link"],
    },
    OtherLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
