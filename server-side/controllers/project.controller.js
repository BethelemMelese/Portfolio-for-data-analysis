const Project = require("../models/project.model.js");
const multer = require("multer");

const GetAllProject = async (req, res) => {
  try {
    const projects = await Project.find();
    const response = projects.map((values) => {
      return {
        id: values._id,
        projectNumber: values.projectNumber,
        projectTitle: values.projectTitle,
        projectDescription: values.projectDescription,
        projectImage: values.projectImage,
        sourceCodeLink: values.sourceCodeLink,
        otherLink: values.otherLink,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.find({ _id: id });
    const response = project.map((values) => {
      return {
        id: values._id,
        projectNumber: values.projectNumber,
        projectTitle: values.projectTitle,
        // projectDescription: values.projectDescription,
        sourceCodeLink: values.sourceCodeLink,
        otherLink: values.otherLink,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateProject = async (req, res) => {
  try {
    const total = await Project.find();
    const addProject = {
      projectNumber: total.length + 1,
      projectTitle: req.body.projectTitle,
      projectDescription: req.body.projectDescription,
      projectImage: req.file.filename,
      sourceCodeLink: req.body.sourceCodeLink,
      otherLink: req.body.otherLink,
    };

    const response = await Project.create(addProject);
    req.status(200).json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const UpdateProject = async (req, res) => {
  try {
    const { file } = req.file;
    console.log("file..", file);
    const { id } = req.params;
    console.log("id...", id);
    const project = await Project.findById({ id });
    console.log("project...", project);
    let updatedProject;
    if (project) {
      updatedProject = file
        ? await Project.findByIdAndUpdate(
            { id },
            {
              projectTitle: req.body.projectTitle,
              projectDescription: req.body.projectDescription,
              sourceCodeLink: req.body.sourceCodeLink,
              otherLink: req.body.otherLink,
            }
          )
        : await Project.findByIdAndUpdate(
            { id },
            {
              projectTitle: req.body.projectTitle,
              projectDescription: req.body.projectDescription,
              projectImage: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
              },
              sourceCodeLink: req.body.sourceCodeLink,
              otherLink: req.body.otherLink,
            }
          );
    }
    res.json(200).status(updatedProject);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    res.json(200).status(project);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  GetAllProject,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
};
