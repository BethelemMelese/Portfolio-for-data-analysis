const {
  GetAllContact,
  AddContactMe,
  GetNotify,
  GetLatestContact,
  EditStatus,
} = require("../controllers/contact.controller.js");
const express = require("express");
const router = express.Router();

router.get("/", GetAllContact);
router.post("/", AddContactMe);
router.get("/notify/", GetNotify);
router.get("/latest/", GetLatestContact);
router.put("/:id",EditStatus);

module.exports = router;
