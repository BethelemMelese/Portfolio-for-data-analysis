const Project = require("../models/project.model.js");
const multer = require('multer');

// // Multer setup for file uploads (in memory)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

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
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const CreateProject = async (req, res) => {
  try {
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
