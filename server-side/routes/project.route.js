const {
  GetAllProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/project.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", GetAllProject);
router.post("/", CreateProject);
router.put("/:id", UpdateProject);
router.delete("/:id", DeleteProject);

module.exports = router;
