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
  DownloadImage
} = require("../controllers/blog.controller.js");
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

router.get("/category/", GetCategoryOnly);
router.get("/byCategoryId/:categoryId", GetBlogByCategory);
router.get("/latestBlog/", GetLatestBlog);
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
