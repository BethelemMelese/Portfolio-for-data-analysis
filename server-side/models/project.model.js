const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectNumber: {
      type: Number,
    },
    projectTitle: {
      type: String,
      required: [true, "Please insert the Project Title"],
    },
    projectDescription: {
      type: String,
      required: [true, "Please insert the Project Description"],
    },
    projectImage: {
      type: String,
      required: [true, "please insert image path"],
    },
    sourceCodeLink: {
      type: String,
      required: [true, "Please insert the Source Code Link"],
    },
    otherLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
