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
  DownloadImage,
} = require("../controllers/blog.controller.js");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.js");

// Multer setup for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Set up multer for file uploads (store images in the 'uploads' directory)
// const Imagestorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const Imageupload = multer({ storage: Imagestorage });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio-images", // Folder in Cloudinary where images will be uploaded
    format: async (req, file) => "jpg" || "png" || "jpeg", // Set image format
    public_id: (req, file) => file.originalname, // Set file name
  },
});

const upload = multer({ storage: storage });

router.get("/category/", GetCategoryOnly);
router.get("/byCategoryId/:categoryId", GetBlogByCategory);
router.get("/latestBlog/", GetLatestBlog);
router.post("/upload-image/", upload.single("file"), UploadImage);
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
