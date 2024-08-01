const {
  GetAllProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/project.controller.js");
const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", GetAllProject);
router.post("/",upload.single('file'), CreateProject);
router.put("/:id", UpdateProject);
router.delete("/:id", DeleteProject);

module.exports = router;
