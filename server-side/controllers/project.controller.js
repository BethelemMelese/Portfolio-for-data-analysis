const Project = require("../models/project.model.js");
const multer = require("multer");
const { decode } = require("html-entities");

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
        youtubeLink: values.youtubeLink,
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
        projectDescription: values.projectDescription,
        sourceCodeLink: values.sourceCodeLink,
        youtubeLink: values.youtubeLink,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateProject = async (req, res) => {
  try {
    const decodedContent = decode(req.body.projectDescription);
    const total = await Project.find();
    const addProject = {
      projectNumber: total.length + 1,
      projectTitle: req.body.projectTitle,
      projectDescription: decodedContent,
      projectImage: req.file.path,
      sourceCodeLink: req.body.sourceCodeLink,
      youtubeLink: req.body.youtubeLink,
    };

    const response = await Project.create(addProject);
    req.status(200).json(response);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const UpdateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedContent = decode(req.body.projectDescription);
    let response;
    const project = await Project.findById({ _id: id });

    if (project) {
      if (req.file == undefined) {
        response = await Project.findByIdAndUpdate(id, {
          projectTitle: req.body.projectTitle,
          projectDescription: decodedContent,
          sourceCodeLink: req.body.sourceCodeLink,
          youtubeLink: req.body.youtubeLink,
        });
      } else {
        response = await Project.findByIdAndUpdate(id, {
          projectTitle: req.body.projectTitle,
          projectDescription: req.body.projectDescription,
          projectImage: req.file.path,
          sourceCodeLink: req.body.sourceCodeLink,
          youtubeLink: req.body.youtubeLink,
        });
      }
    }
    res.status(200).json(response);
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

const UploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const imageUrl = req.file.path;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const DownloadPhoto = async (req, res) => {
  try {
    const { filePath } = req.params;
    const path = process.env.FILE_PATH;
    const response = path + filePath;
    res.sendFile(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllProject,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
  UploadImage,
  DownloadPhoto,
};
