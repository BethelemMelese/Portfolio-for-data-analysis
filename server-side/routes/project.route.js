const {
  GetAllProject,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/project.controller.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/files");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", GetAllProject);
router.get("/:id", GetProjectById);
router.post("/", upload.single("file"), CreateProject);
router.put("/:id", UpdateProject);
router.delete("/:id", DeleteProject);

module.exports = router;
