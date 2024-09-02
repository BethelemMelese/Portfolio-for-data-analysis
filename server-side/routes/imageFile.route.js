const {UploadImageFile,RetrieveImageFile}=require("../controllers/imageFile.controller.js");
const express=require("express");
const router=express.Router();
const multer = require('multer');

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/files", RetrieveImageFile);
router.post("/", upload.single('file'),UploadImageFile);

module.exports=router;