const Resume = require("../models/resume.model.js");

const GetResumeLink = async (req, res) => {
  try {
    const resume = await Resume.find();
    const response = resume.map((item) => {
      return {
        id: item._id,
        resumeLink: item.resumeLink,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AddResumeLink = async (req, res) => {
  try {
    const resume = await Resume.create({ resumeLink: req.body.resumeLink });
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const UpdateResumeLink = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findByIdAndUpdate(
      { _id: id },
      {
        resumeLink: req.body.resumeLink,
      }
    );

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  AddResumeLink,
  UpdateResumeLink,
  GetResumeLink,
};
