const {
  GetAllProject,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
  DownloadPhoto,
} = require("../controllers/project.controller.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", GetAllProject);
router.get("/:id", GetProjectById);
router.post("/", upload.single("file"), CreateProject);
router.put("/:id", upload.single("file"), UpdateProject);
router.delete("/:id", DeleteProject);
router.get("/uploads/:filePath", DownloadPhoto);

module.exports = router;
