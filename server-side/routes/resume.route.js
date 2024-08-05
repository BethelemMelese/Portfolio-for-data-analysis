const {
  AddResumeLink,
  UpdateResumeLink,
  GetResumeLink,
} = require("../controllers/resume.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", GetResumeLink);
router.post("/", AddResumeLink);
router.put("/:id", UpdateResumeLink);

module.exports = router;
