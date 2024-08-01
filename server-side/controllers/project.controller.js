const Project = require("../models/project.model.js");
const multer = require("multer");

// Multer setup for file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// // Route to render image upload page and display images
// app.get('/', (req, res) => {
//     imgSchema.find({})
//         .then(data => {
//             res.render('imagepage', { items: data });
//         })
//         .catch(err => console.log(err));
// });

// // Route to handle image upload
// app.post('/', upload.single('image'), (req, res, next) => {
//     const obj = {
//         img: {
//             data: req.file.buffer,
//             contentType: req.file.mimetype
//         }
//     };
//     imgSchema.create(obj)
//         .then(item => {
//             res.redirect('/');
//         })
//         .catch(err => console.log(err));
// });

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
        OtherLink: values.OtherLink,
      };
    });

    console.log("response..", response);
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
      projectImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
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
  } catch (error) {
    res.json({ message: error.message });
  }
};

const DeleteProject = async (req, res) => {
  try {
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  GetAllProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
};
