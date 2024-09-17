const {
  GetCategoryOnly,
  GetBlogByCategory,
  GetLatestBlog,
  AddBlogOnly,
  AddCategoryOnly,
  EditBlogOnly,
  EditCategoryOnly,
  DeleteBlog,
  DeleteCategory,
  UploadImage,
  DownloadImage
} = require("../controllers/blog.controller.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Set up multer for file uploads (store images in the 'uploads' directory)
const Imagestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const Imageupload = multer({ storage: Imagestorage });


router.get("/category/", GetCategoryOnly);
router.get("/byCategoryId/:categoryId", GetBlogByCategory);
router.get("/latestBlog/", GetLatestBlog);
router.post("/upload-image/", Imageupload.single("image"), UploadImage);
router.post("/addBlog/", upload.single("file"), AddBlogOnly);
router.post("/addCategory/", upload.single("file"), AddCategoryOnly);
router.put("/editBlog/:blogId", upload.single("file"), EditBlogOnly);
router.put(
  "/editCategory/:categoryId",
  upload.single("file"),
  EditCategoryOnly
);
router.delete("/deleteBlog/:blogId", DeleteBlog);
router.delete("/deleteCategory/:categoryId", DeleteCategory);
router.get("/uploads/:filePath", DownloadImage);
module.exports = router;
