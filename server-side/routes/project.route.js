const {
  GetAllProject,
  GetProjectById,
  CreateProject,
  UpdateProject,
  DeleteProject,
  UploadImage,
  DownloadPhoto,
} = require("../controllers/project.controller.js");
const express = require("express");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.js"); // path to the cloudinary config file
const multer = require("multer");

// Create a Cloudinary storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio-images", // Folder in Cloudinary where images will be uploaded
    format: async (req, file) => "jpg" || "png" || "jpeg", // Set image format
    public_id: (req, file) => file.originalname, // Set file name
  },
});

// Configure multer with Cloudinary storage
const upload = multer({ storage: storage });

router.get("/", GetAllProject);
router.get("/:id", GetProjectById);
router.post("/", upload.single("file"), CreateProject);
router.put("/:id", upload.single("file"), UpdateProject);
router.delete("/:id", DeleteProject);
router.post("/upload-image/", upload.single("file"), UploadImage);
router.get("/uploads/:filePath", DownloadPhoto);

module.exports = router;
